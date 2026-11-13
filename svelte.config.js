import adapter from './adapters/aws-lambda-edge/index.js';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const mdsvexOptions = {
	extensions: ['.md']
};
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
