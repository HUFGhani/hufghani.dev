import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'

import * as CloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as S3Bucket from 'aws-cdk-lib/aws-s3'

enum PrefixPath {
	static = 'static',
	prerendered = 'prerendered',
}

export class SiteStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const bucket = new S3Bucket.Bucket(this, 'StaticBucket', {})
		const s3BucketOrigin = new CloudfrontOrigins.S3Origin(bucket, {
			originPath: PrefixPath.static,
		})
	}
}
