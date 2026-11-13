import { App } from 'aws-cdk-lib';
import { WebsiteStack } from './website-stack.mjs';

const app = new App();

new WebsiteStack(app, 'hufghani-personal-website', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: 'us-east-1'
	}
});
