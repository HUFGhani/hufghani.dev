<<<<<<< HEAD
=======
import { adapter } from '@sveltekit-cdk/adapter'
>>>>>>> 23eecb2 (:sparkles: feat(custom): add cdk to project)
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),
	kit: {
		adapter: adapter({
			cdkProjectPath: './infrastructure',
		}),
	},
}

export default config
