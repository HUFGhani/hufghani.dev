<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { MENULINK } from '$lib/config';

	const featureFlags = getContext<Record<string, boolean>>('featureFlags');
	let theme = $state<'light' | 'dark'>('dark');
	const menuLinks = $derived(
		MENULINK.filter(({ title }) => title.toLowerCase() !== 'blog' || featureFlags?.showBlog === true)
	);
	const themeActionLabel = $derived(
		theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
	);

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'light' || savedTheme === 'dark') {
			theme = savedTheme;
			document.documentElement.setAttribute('data-theme', theme);
		}
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<header class="flex w-full items-center justify-between border-b border-base-content/10 py-6">
	<a href={resolve('/')} aria-label="hufghani.dev home" class="text-sm font-semibold tracking-tight text-base-content transition-colors hover:opacity-75">
		hufghani<span class="text-primary">.</span>dev
	</a>

	<nav aria-label="Main navigation" class="flex items-center gap-4 text-sm text-base-content/70 sm:gap-7">
		{#each menuLinks as item}
			<a
				href={resolve(`/${item.link}` as never)}
				aria-label={item.fullTitle ?? item.title}
				class="transition-colors duration-200 hover:text-base-content"
				{...(item.isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
			>
				{item.title}
			</a>
		{/each}
		<button type="button" class="btn btn-ghost btn-circle btn-sm" aria-label={themeActionLabel} title={themeActionLabel} onclick={toggleTheme}>
			{#if theme === 'dark'}
				<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
			{:else}
				<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>
			{/if}
		</button>
	</nav>
</header>
