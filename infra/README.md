# AWS infrastructure

The SvelteKit adapter in `../adapters/aws-lambda-edge/` packages the server for
Lambda@Edge and exports client and prerendered assets. The CDK stack in
`website-stack.mjs` owns the CloudFront distribution, Lambda@Edge function, S3
asset bucket, and asset deployment. `cloudfront-function.js` contains the
viewer-request routing and canonical-domain redirect logic.

Build the SvelteKit application before synthesizing or deploying the stack:

```sh
pnpm run build
pnpm run infra:synth
pnpm run infra:deploy
```

The Lambda@Edge function and ACM certificate are deployed from `us-east-1`.
The AWS account is selected from the active CDK credentials.
