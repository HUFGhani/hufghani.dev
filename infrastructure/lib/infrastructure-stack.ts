import {
	aws_certificatemanager,
	aws_cloudfront,
	aws_cloudfront_origins,
	aws_lambda,
	aws_route53,
	aws_route53_targets,
	aws_s3,
	aws_s3_deployment,
	aws_ssm,
	Duration,
	Stack,
	StackProps,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { buildSync } from 'esbuild'
import { readFileSync } from 'fs'
import { join } from 'path'
import { EnvUtil } from './EnvUtil'

enum PrefixPath {
	static = 'static',
	prerendered = 'prerendered',
}
export type StaticRoutes = Record<string, PrefixPath.prerendered | PrefixPath.static>
export const DEFAULT_ARTIFACT_PATH = 'sveltekit'

export class InfrastructureStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const staticPath = join(DEFAULT_ARTIFACT_PATH, PrefixPath.static)
		const prerenderedPath = join(DEFAULT_ARTIFACT_PATH, PrefixPath.prerendered)
		const routesPath = join(DEFAULT_ARTIFACT_PATH, 'routes.json')
		const headersPath = join(DEFAULT_ARTIFACT_PATH, 'headers.json')
		const routes: StaticRoutes = JSON.parse(readFileSync(routesPath, { encoding: 'utf8' }))
		const headers: string[] = JSON.parse(readFileSync(headersPath, { encoding: 'utf8' }))
		const envUtils = new EnvUtil({})

		const s3Bucket = new aws_s3.Bucket(this, 'StaticBucket', {})
		const s3static = new aws_cloudfront_origins.S3Origin(s3Bucket, {
			originPath: PrefixPath.static,
		})

		const origin = new aws_cloudfront_origins.S3Origin(s3Bucket, {
			originPath: PrefixPath.prerendered,
			customHeaders: envUtils.customHeaders(),
		})

		const originRequestPolicy = new aws_cloudfront.OriginRequestPolicy(
			this,
			'dynamicRequestPolicy',
			{
				cookieBehavior: aws_cloudfront.OriginRequestCookieBehavior.all(),
				headerBehavior: aws_cloudfront.OriginRequestHeaderBehavior.allowList(
					...headers,
					'CloudFront-Viewer-Address'
				),
				queryStringBehavior: aws_cloudfront.OriginRequestQueryStringBehavior.all(),
			}
		)

		const cachePolicy = new aws_cloudfront.CachePolicy(this, 'dynamicCachePolicy', {
			cookieBehavior: aws_cloudfront.CacheCookieBehavior.all(),
			enableAcceptEncodingBrotli: true,
			enableAcceptEncodingGzip: true,
		})

		const bundleDir = join(DEFAULT_ARTIFACT_PATH, 'lambda/at-edge-env')
		const outfile = join(bundleDir, 'handler.js')
		const code = buildSync({
			entryPoints: [join(DEFAULT_ARTIFACT_PATH, 'lambda/at-edge/handler.js')],
			outfile,
			bundle: true,
			platform: 'node',
			define: {
				SVELTEKIT_CDK_LOG_LEVEL: JSON.stringify('INFO'),
				SVELTEKIT_CDK_ENV_MAP: envUtils.mappingJSON(),
			},
		})
		if (code.errors.length > 0) {
			console.log('bundling lambda failed')
			throw new Error(code.errors.map(e => e.text).join('\n'))
		}

		const edgeLambdasFunction = new aws_cloudfront.experimental.EdgeFunction(
			this,
			'edgeLambdasFunctionHandler',
			{
				code: aws_lambda.Code.fromAsset(bundleDir),
				handler: 'handler.handler',
				runtime: aws_lambda.Runtime.NODEJS_16_X,
				timeout: Duration.seconds(5),
				logRetention: 7,
			}
		)

		const edgeLambdas: aws_cloudfront.EdgeLambda[] = [
			{
				eventType: aws_cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
				functionVersion: edgeLambdasFunction.currentVersion,
				includeBody: true,
			},
		]

		const distribution = this.cloudfrontDistribution(
			origin,
			edgeLambdas,
			originRequestPolicy,
			cachePolicy
		)

		this.addCloudfrontDistributionToRoute53(distribution)

		let hasPrerendered = false
		// routes for static content
		Object.entries(routes).forEach(([glob, origin]) => {
			if (origin === PrefixPath.static) {
				distribution.addBehavior(glob, s3static, {
					viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				})
			} else if (origin === PrefixPath.prerendered) {
				hasPrerendered = true
			}
		})

		if (hasPrerendered) {
			// deploy with explicit content type to set it correctly for prerendered
			this.s3DeploymentBucket(
				'prerenderedDeployment',
				s3Bucket,
				prerenderedPath,
				distribution,
				routes,
				PrefixPath.prerendered,
				PrefixPath.prerendered
			)
		}

		this.s3DeploymentBucket(
			'staticDeployment',
			s3Bucket,
			staticPath,
			distribution,
			routes,
			PrefixPath.static,
			PrefixPath.static
		)
	}

	private addCloudfrontDistributionToRoute53(distribution: aws_cloudfront.Distribution): void {
		const hostzone = aws_route53.HostedZone.fromLookup(this, 'hostzone', {
			domainName: 'hufghani.dev',
		})

		new aws_route53.ARecord(this, 'distributionEntrytoRoute53', {
			target: aws_route53.RecordTarget.fromAlias(
				new aws_route53_targets.CloudFrontTarget(distribution)
			),
			zone: hostzone,
			recordName: 'hufghani.dev',
		})
	}

	private cloudfrontDistribution(
		origin: aws_cloudfront_origins.S3Origin,
		edgeLambdas: aws_cloudfront.EdgeLambda[],
		originRequestPolicy: aws_cloudfront.OriginRequestPolicy,
		cachePolicy: aws_cloudfront.CachePolicy
	): aws_cloudfront.Distribution {
		return new aws_cloudfront.Distribution(this, 'distribution', {
			priceClass: aws_cloudfront.PriceClass.PRICE_CLASS_100,
			defaultBehavior: {
				origin,
				viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				edgeLambdas,
				allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
				originRequestPolicy: edgeLambdas ? originRequestPolicy : undefined,
				cachePolicy: edgeLambdas ? cachePolicy : undefined,
			},
			additionalBehaviors: {
				'api/*': {
					compress: true,
					origin,
					viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
					allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
					cachePolicy: aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
					originRequestPolicy: aws_cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
				},
			},
			domainNames: ['hufghani.dev'],
			certificate: aws_certificatemanager.Certificate.fromCertificateArn(
				this,
				'certificate',
				aws_ssm.StringParameter.fromStringParameterName(
					this,
					'certificateSSM',
					'/hufghani.dev/Certificate'
				).stringValue
			),
		})
	}

	private s3DeploymentBucket(
		id: string,
		s3Bucket: aws_s3.Bucket,
		path: string,
		distribution: aws_cloudfront.Distribution,
		routes: StaticRoutes,
		destinationKeyPrefix: string,
		distributionPath: string
	): void {
		new aws_s3_deployment.BucketDeployment(this, id, {
			destinationBucket: s3Bucket,
			destinationKeyPrefix: destinationKeyPrefix,
			sources: [aws_s3_deployment.Source.asset(path)],
			distribution: distribution,
			cacheControl: [aws_s3_deployment.CacheControl.maxAge(Duration.days(365))],
			distributionPaths: Object.entries(routes)
				.filter(([_, t]) => t === distributionPath)
				.map(([r, _]) => `/${r}`),
		})
	}
}
