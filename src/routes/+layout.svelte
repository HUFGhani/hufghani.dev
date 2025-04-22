<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div
	class="xl:max-w-10xl mx-auto mt-0 flex flex-col content-center items-center justify-center pt-10 pb-20 sm:px-2 md:px-2 lg:px-20 xl:px-20"
>
	<NavBar />
	<main class="w-full sm:p-2 md:p-2 lg:pt-20 xl:pt-20">
		{@render children()}
	</main>
</div>
<Footer />
