import adapter from '@jill64/sveltekit-adapter-aws'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		postcss: true,
	}),
	kit: {
		adapter: adapter({
			name: "hufghani-personal-website",
			deploy: true,
			architecture: 'edge-unbundled',
			runtime: 'NODE_18',
			cdn: true,
			skipBootstrap: true,
			domain:{
				fqdn: "hufghani.dev",
				certificateArn: "arn:aws:acm:us-east-1:078423179649:certificate/47bc68da-40cf-461a-afbc-ba12d8464087"
			}
		}),
	},
}

export default config
