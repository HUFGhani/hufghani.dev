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
	class="flex flex-col content-center justify-center items-center xl:max-w-10xl mt-0 mx-auto sm:px-2 md:px-2 lg:px-20 xl:px-20 pt-10"
>
	<NavBar />
	<main class="w-full sm:p-2 md:p-2 lg:pt-20 xl:pt-20">
		<slot />
	</main>
</div>
<Footer />
