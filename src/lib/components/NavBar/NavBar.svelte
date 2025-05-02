<script lang="ts">
	import { Logo } from '$lib/components/Logo';
	import { MENULINK } from '$lib/config';
	import { Random } from '$lib/icon';
	import { getTheme, setHTMLAttribute, setTheme } from '$lib/utlis';


	const selectRandomTheme = (): void => {
		let randomNumber = Math.floor(Math.random() * 29) + 1;
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
				29: 'winter'
			})[themeId];

		const theme = getTheme();
		if (theme != undefined && theme != '') {
			if (localStorage.getItem('theme') && getTheme() != '') {
				setHTMLAttribute(theme);
			}
		}

		setTheme(themes(randomNumber)?.toString()!);
	};
</script>

<div
	class="flex w-full
	flex-wrap items-center justify-center bg-transparent
	pb-4 align-middle sm:flex-col
	sm:px-4 md:flex-row
	md:px-4 lg:flex-row lg:justify-between lg:px-8
	xl:flex-row xl:justify-between
	 xl:px-8"
>
	<div class="mb-4 lg:mb-0 xl:mb-0">
		<a href="/" aria-label="Go to Homepage">
			<Logo />
		</a>
	</div>

	<div class="flex flex-row items-center justify-center space-x-4 text-center text-base md:pl-10">
		{#each MENULINK as { link, title, isExternal, fullTitle }}
			{#if title !== 'Blog'}
				<div data-sveltekit-preload-data="hover" class="hover:bg-accent rounded-md p-2 text-center">
					{#if isExternal}
						<a href={link} aria-label={title} target="_blank" rel="noreferrer" class="h-12 w-12">
							<abbr title={fullTitle} class="cursor-default border-none no-underline">
								{title}
							</abbr>
						</a>
					{:else}
						<a class="h-12 w-12" href={link} aria-label={title}>{title} </a>
					{/if}
				</div>
			{/if}
		{/each}
		<button
			class="hover:bg-accent rounded-md p-2 text-center"
			aria-label="random theme selector"
			on:click={selectRandomTheme}
		>
			<Random cssClasses="w-6 h-6" />
		</button>
	</div>
</div>
