<script lang="ts">
	import { setHTMLAttribute, setTheme } from '$lib/utlis'
	import '../app.css'
	import Footer from '../lib/components/Footer.svelte'
	import NavBar from '../lib/components/NavBar.svelte'

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
</script>

<div
	class="flex flex-col content-center justify-center items-center xl:max-w-6xl mt-0 mx-auto sm:px-2 md:px-2 lg:px-20 xl:px-20 pt-10"
>
	<NavBar />
	<main class="sm:w-full md:w-11/12 lg:w-11/12 sm:p-2 md:p-2 lg:pt-20 xl:pt-20 text-center">
		<slot />
	</main>
</div>
<Footer />
