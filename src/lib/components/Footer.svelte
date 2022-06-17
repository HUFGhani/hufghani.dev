<script lang="ts">
	import { AUTHORNAME } from '../info'
	import SocialMedia from './SocialMedia.svelte'
</script>

<footer
	class="mt-4 text-lg text-center w-full flex flex-col align-middle justify-center items-center content-center"
>
	<p
		class="text-sm"
		aria-label="© 2017 - {new Date().getFullYear()}, All right reserved {AUTHORNAME}"
		data-testid="copyRight-year"
	>
		© 2017 - {new Date().getFullYear()}, All right reserved {AUTHORNAME}
	</p>
	<SocialMedia />
	<p class="text-sm pb-4">Built with SvelteKit · Hosted on S3 and distributed by CloudFront</p>
</footer>
