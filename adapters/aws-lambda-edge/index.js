import { build } from 'esbuild';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appDir, domainName } from '../../infra/config.mjs';

const adapterDirectory = path.dirname(fileURLToPath(import.meta.url));

async function listFiles(directory, relativeDirectory = '') {
	const entries = await readdir(path.join(directory, relativeDirectory), {
		withFileTypes: true
	});

	const files = [];

	for (const entry of entries) {
		const relativePath = path.join(relativeDirectory, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await listFiles(directory, relativePath)));
		} else {
			files.push(relativePath.split(path.sep).join('/'));
		}
	}

	return files;
}

export default function awsLambdaEdge() {
	return {
		name: 'aws-lambda-edge-adapter',
		async adapt(builder) {
			const outputDirectory = path.resolve('build');
			const serverDirectory = builder.getBuildDirectory('aws-lambda-edge');
			const clientDirectory = path.join(outputDirectory, 's3', builder.config.kit.paths.base);

			builder.rimraf(outputDirectory);
			builder.rimraf(serverDirectory);
			builder.mkdirp(serverDirectory);

			builder.writeClient(clientDirectory);
			builder.writePrerendered(clientDirectory);
			builder.writeServer(serverDirectory);

			const staticAssets = (await listFiles(clientDirectory))
				.filter((file) => !file.startsWith(`${appDir}/`))
				.map((file) => `${builder.config.kit.paths.base}/${file}`);

			await writeFile(
				path.join(serverDirectory, 'manifest.js'),
				[
					`export const manifest = ${builder.generateManifest({ relativePath: './' })};`,
					`export const staticAssets = new Set(${JSON.stringify(staticAssets)});`,
					`export const appPath = ${JSON.stringify(builder.getAppPath())};`,
					`export const domainName = ${JSON.stringify(domainName)};`
				].join('\n')
			);

			builder.copy(
				path.join(adapterDirectory, 'handler.js'),
				path.join(serverDirectory, 'handler.js')
			);

			await mkdir(path.join(outputDirectory, 'edge'), { recursive: true });

			await build({
				entryPoints: [path.join(serverDirectory, 'handler.js')],
				outfile: path.join(outputDirectory, 'edge', 'server.js'),
				bundle: true,
				minify: true,
				format: 'cjs',
				platform: 'node',
				target: 'node22',
				external: ['node:*', '@aws-sdk/*']
			});

			await writeFile(
				path.join(outputDirectory, 'edge', 'package.json'),
				JSON.stringify({ type: 'commonjs' })
			);

			builder.log.success('Built AWS Lambda@Edge handler and static assets');
		}
	};
}
