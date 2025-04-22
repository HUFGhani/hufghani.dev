import adapter from '@jill64/sveltekit-adapter-aws';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			skipBootstrap: false,
			name: 'hufghani-personal-website',
			architecture: 'edge-bundled',
			runtime: 'NODE_20',
			cdn: true,
			domain: {
				fqdn: 'hufghani.dev',
				certificateArn:
					'arn:aws:acm:us-east-1:078423179649:certificate/47bc68da-40cf-461a-afbc-ba12d8464087'
			}
		})
	},
	extensions: ['.svelte', '.svx']
};

export default config;
