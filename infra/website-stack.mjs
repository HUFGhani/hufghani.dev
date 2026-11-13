import path from 'node:path';
import {
	CfnOutput,
	Duration,
	Stack,
	aws_certificatemanager,
	aws_cloudfront,
	aws_cloudfront_origins,
	aws_lambda,
	aws_s3,
	aws_s3_deployment
} from 'aws-cdk-lib';
import { appDir, certificateArn, domainName, lambdaMemorySize } from './config.mjs';

export class WebsiteStack extends Stack {
	constructor(scope, id, props) {
		super(scope, id, props);

		const edge = new aws_cloudfront.experimental.EdgeFunction(this, 'Edge', {
			code: aws_lambda.Code.fromAsset(path.resolve('build/edge')),
			handler: 'server.handler',
			runtime: aws_lambda.Runtime.NODEJS_LATEST,
			timeout: Duration.seconds(30),
			memorySize: lambdaMemorySize
		});

		const routingFunction = new aws_cloudfront.Function(this, 'CF2', {
			code: aws_cloudfront.FunctionCode.fromFile({
				filePath: path.resolve('infra/cloudfront-function.js')
			})
		});

		const bucket = new aws_s3.Bucket(this, 'Bucket');

		const staticBehavior = {
			viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
			originRequestPolicy: aws_cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
			origin: new aws_cloudfront_origins.S3Origin(bucket),
			functionAssociations: [
				{
					function: routingFunction,
					eventType: aws_cloudfront.FunctionEventType.VIEWER_REQUEST
				}
			]
		};

		const distribution = new aws_cloudfront.Distribution(this, 'CloudFront', {
			domainNames: [domainName],
			certificate: aws_certificatemanager.Certificate.fromCertificateArn(
				this,
				'CertificateManagerCertificate',
				certificateArn
			),
			defaultBehavior: {
				...staticBehavior,
				cachePolicy: aws_cloudfront.CachePolicy.CACHING_DISABLED,
				allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
				edgeLambdas: [
					{
						functionVersion: edge,
						eventType: aws_cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
						includeBody: true
					}
				]
			},
			httpVersion: aws_cloudfront.HttpVersion.HTTP2_AND_3,
			additionalBehaviors: {
				[`/${appDir}/*`]: staticBehavior
			}
		});

		new aws_s3_deployment.BucketDeployment(this, 'S3Deploy', {
			sources: [aws_s3_deployment.Source.asset(path.resolve('build/s3'))],
			destinationBucket: bucket,
			distribution,
			memoryLimit: 1024
		});

		new CfnOutput(this, 'Deployed URL', {
			description: 'Deployed URL',
			value: `https://${domainName}`
		});

		new CfnOutput(this, 'CloudFront URL', {
			description: 'CloudFront URL',
			value: `https://${distribution.distributionDomainName}`
		});
	}
}
