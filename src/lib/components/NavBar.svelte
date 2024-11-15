<script lang="ts">
	import Random from '$lib/icon/Random.svelte'
	import { MENULINK } from '$lib/info'
	import { getTheme, setHTMLAttribute, setTheme } from '$lib/utlis'
	import Logo from './Logo.svelte'

	const selectRandomTheme = (): void => {
		let randomNumber = Math.floor(Math.random() * 29) + 1
		console.log('randomNumber', randomNumber)
		const themes = (themeId: number) =>
			({
				1: 'light',
				2: 'dark',
				3: 'cupcake',
				4: 'bumblebee',
				5: 'emerald',
				6: 'corporate',
				7: 'synthwave',
				8: 'retro',
				9: 'cyberpunk',
				10: 'valentine',
				11: 'halloween',
				12: 'garden',
				13: 'forest',
				14: 'aqua',
				15: 'lofi',
				16: 'pastel',
				17: 'fantasy',
				18: 'wireframe',
				19: 'black',
				20: 'luxury',
				21: 'dracula',
				22: 'cmyk',
				23: 'autumn',
				24: 'business',
				25: 'acid',
				26: 'lemonade',
				27: 'night',
				28: 'coffee',
				29: 'winter',
			}[themeId])

		const theme = getTheme()
		if (theme != undefined && theme != '') {
			if (localStorage.getItem('theme') && getTheme() != '') {
				setHTMLAttribute(theme)
			}
		}

		setTheme(themes(randomNumber)?.toString()!)
	}

	const setLogolink = (): string =>{
		if (process.env.NODE_ENV != 'development'){
			return "https://hufghani.dev/"
		}

		return "http://localhost:5173"
	}
	
</script>

<div
	class="flex items-center
	sm:flex-col md:flex-row lg:flex-row xl:flex-row
	justify-center lg:justify-between xl:justify-between
	flex-wrap w-full
	sm:px-4 md:px-4 lg:px-8 xl:px-8
	bg-transparent pb-4
	 align-middle"
>
	<div class="mb-4 lg:mb-0 xl:mb-0">
		<a href={setLogolink()}>
			<Logo />
		</a>
	</div>

	<div class="flex flex-row md:pl-10 space-x-4 items-center justify-center text-base text-center">
		{#each MENULINK as { link, title, isExternal, fullTitle }}
			<div class="rounded-md p-2 text-center hover:bg-accent">
				{#if isExternal}
					<a href={link} aria-label={title} target="_blank" rel="noreferrer" class="w-12 h-12">
						<abbr title={fullTitle} class="border-none cursor-default no-underline">
							{title}
						</abbr>
					</a>
				{:else}
					<a class="w-12 h-12" href={link} aria-label={title}>{title} </a>
				{/if}
			</div>
		{/each}
		<button
			class="rounded-md p-2 text-center hover:bg-accent"
			aria-label="random theme selector"
			on:click={selectRandomTheme}
		>
			<Random cssClasses="w-6 h-6" />
		</button>
	</div>
</div>
