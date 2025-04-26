import fs from 'fs';
import path from 'path';

const STACK_FILE = path.resolve('build', 'bin', 'cdk-stack.ts');

try {
	let content = fs.readFileSync(STACK_FILE, 'utf-8');

	const bucketDeploymentMatch = content.match(/aws_s3_deployment.BucketDeployment\(([^)]+)\)/);

	if (!bucketDeploymentMatch) {
		throw new Error('Could not find BucketDeployment block in stack.ts');
	}

	// Inject memoryLimit if not already present
	if (!content.includes('memoryLimit')) {
		content = content.replace(
			/aws_s3_deployment.BucketDeployment\(([^)]+){/,
			(match) => match + `\n      memoryLimit: 1024,`
		);

		fs.writeFileSync(STACK_FILE, content);
		console.log('✔️ Patched stack.ts to include memoryLimit: 1024');
	} else {
		console.log('ℹ️ memoryLimit already present, skipping patch');
	}
} catch (error) {
	console.error('❌ Failed to patch stack.ts:', error);
}
