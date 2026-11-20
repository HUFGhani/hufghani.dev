<script lang="ts">
	import { getContext } from 'svelte';
	import { MENULINK } from '$lib/config';

	const featureFlags = getContext<Record<string, boolean>>('featureFlags');
	const menuLinks = $derived(
		MENULINK.filter(({ title }) => title.toLowerCase() !== 'blog' || featureFlags?.showBlog === true)
	);
</script>

<header class="flex w-full items-center justify-between border-b border-white/10 py-6">
	<a href="/" aria-label="hufghani.dev home" class="text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover:text-white">
		hufghani<span class="text-[#8ba5ff]">.</span>dev
	</a>

	<nav aria-label="Main navigation" class="flex items-center gap-5 text-sm text-zinc-400 sm:gap-8">
		{#each menuLinks as item, index}
			<a
				href={`/${item.link}`}
				aria-label={item.fullTitle ?? item.title}
				class="transition-colors duration-200 hover:text-white"
				{...(item.isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
			>
				<span aria-hidden="true" class="mr-1.5 font-mono text-xs text-zinc-600">{String(index + 1).padStart(2, '0')}</span>
				{item.title}
			</a>
		{/each}
	</nav>
</header>
