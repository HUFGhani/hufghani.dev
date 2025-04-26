<script lang="ts">
	import { onMount } from 'svelte';
	import { AUTHORNAME } from '../config';
	import Fade from './Fade.svelte';
	import SocialMedia from './SocialMedia.svelte';
	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<Fade {visible}>
	<footer
		data-testid="footer"
		class="mt-4 flex w-full flex-col content-center items-center justify-center text-center align-middle text-lg"
	>
		<p class="text-sm" data-testid="copyRight-year">
			© 2017 - {new Date().getFullYear()}, All right reserved {AUTHORNAME}
		</p>
		<SocialMedia />
		<p class="pb-4 text-sm">Built with SvelteKit · Hosted on S3 and distributed by CloudFront</p>
	</footer>
</Fade>
