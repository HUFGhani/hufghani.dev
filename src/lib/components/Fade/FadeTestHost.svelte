<script lang="ts">
	import Fade from './Fade.svelte';

	let { visible = false }: { visible?: boolean } = $props();
</script>

<Fade {visible}>
	<p>Fading content</p>
</Fade>
