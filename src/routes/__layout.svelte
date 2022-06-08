<script lang="ts">
	import '../app.css';
	import Footer from '../lib/components/Footer.svelte';
	import NavBar from '../lib/components/NavBar.svelte';
</script>

<div
	class="flex flex-col content-center justify-center items-center xl:max-w-6xl mt-0 mx-auto sm:px-2 md:px-2 lg:px-20 xl:px-20 pt-10"
>
	<NavBar />
	<div class="sm:w-full md:w-11/12 lg:w-11/12 sm:p-2 md:p-2 lg:pt-40 xl:pt-40 text-center">
		<slot />
	</div>
	<Footer />
</div>
