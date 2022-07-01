<script lang="ts">
	import { setHTMLAttribute, setTheme } from '$lib/utlis'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import '../app.css'
	import Footer from '../lib/components/Footer.svelte'
	import NavBar from '../lib/components/NavBar.svelte'

	let visible = false

	if (typeof window !== 'undefined') {
		const theme = localStorage.getItem('theme')
		if (theme != undefined && theme != '') {
			if (localStorage.getItem('theme') && localStorage.getItem('theme') != '') {
				setHTMLAttribute(theme)
			}
		} else {
			setTheme('light')
		}
	}

	onMount(() => {
		visible = true
	})
</script>

<div
	class="flex flex-col content-center justify-center items-center xl:max-w-10xl mt-0 mx-auto sm:px-2 md:px-2 lg:px-20 xl:px-20 pt-10 pb-20"
>
	<NavBar />
	{#if visible}
		<main class="w-full sm:p-2 md:p-2 lg:pt-20 xl:pt-20" in:fly={{ y: 200, duration: 2000 }}>
			<slot />
		</main>
	{/if}
</div>
{#if visible}
	<Footer />
{/if}
