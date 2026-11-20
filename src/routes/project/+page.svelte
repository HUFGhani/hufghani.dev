<script lang="ts">
	import { Fade } from '$lib/components/Fade';
	import { MetaTags } from '$lib/components/MetaTags';
	import { NON_PROJECT } from '$lib/config';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { nodes: repos } = data.viewer.repositories;

	let visible = $state(false);
	let query = $state('');

	onMount(() => {
		visible = true;
	});

	const cleanProjectTitle = (title: string) =>
		title !== 'api.hufghani.dev' ? title.replace(/_|-|\\./g, ' ') : title;

	const projects = repos.filter(
		(repo) => !repo.isArchived && !repo.isTemplate && !NON_PROJECT.includes(cleanProjectTitle(repo.name))
	);

	const filteredProjects = $derived(
		projects.filter((repo) => {
			const searchable = `${cleanProjectTitle(repo.name)} ${repo.description ?? ''} ${repo.primaryLanguage?.name ?? ''}`;
			return searchable.toLowerCase().includes(query.trim().toLowerCase());
		})
	);
</script>

<MetaTags
	ogType="website"
	pageTitle="Projects"
	pageDescription="Selected projects, experiments and open-source work by Hamza Ghani."
/>

<Fade {visible}>
	<section class="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
		<div class="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
			<div class="max-w-2xl">
				<p class="mb-4 text-sm font-medium tracking-[0.18em] text-[var(--accent)] uppercase">Things I've built</p>
				<h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Projects<span class="text-[var(--accent)]">.</span></h1>
				<p class="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
					A collection of side projects, experiments and open-source work. A little bit of everything—from useful tools to ideas explored in code.
				</p>
			</div>
			<div class="w-full sm:max-w-xs">
				<label for="project-search" class="sr-only">Search projects</label>
				<div class="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 transition-colors focus-within:border-[var(--accent)]">
					<svg aria-hidden="true" class="h-4 w-4 shrink-0 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
					<input id="project-search" bind:value={query} placeholder="Find a project…" class="w-full border-0 bg-transparent p-0 text-sm text-[var(--text)] placeholder:text-[var(--subtle)] focus:outline-none focus:ring-0" />
				</div>
			</div>
		</div>

		<div class="mb-5 flex items-center justify-between border-b border-[var(--line)] pb-4">
			<p class="text-sm text-[var(--muted)]">{filteredProjects.length} <span class="text-[var(--subtle)]">projects</span></p>
			<p class="hidden text-xs tracking-wide text-[var(--subtle)] sm:block">OPEN SOURCE & PERSONAL WORK</p>
		</div>

		{#if filteredProjects.length}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects as repo (repo.name)}
					<a
						href={repo.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex min-h-56 flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(139,165,255,0.45)] hover:bg-[var(--surface-raised)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
					>
						<div class="mb-7 flex items-start justify-between gap-4">
							<div class="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--accent)]">
								<svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 17l-5-5 5-5M16 7l5 5-5 5M14 4l-4 16"/></svg>
							</div>
							<svg aria-hidden="true" class="h-4 w-4 text-[var(--subtle)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M8 7h9v9"/></svg>
						</div>
						<h2 class="mb-3 text-lg font-semibold capitalize tracking-tight text-[var(--text)]">{cleanProjectTitle(repo.name)}</h2>
						<p class="line-clamp-3 flex-1 text-sm leading-6 text-[var(--muted)]">{repo.description || 'A personal project and exploration in software development.'}</p>
						<div class="mt-6 flex items-center gap-2">
							{#if repo.primaryLanguage?.name}
								<span class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
									<span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
									{repo.primaryLanguage.name}
								</span>
							{:else}
							<span class="text-xs text-[var(--subtle)]">Repository</span>
						{/if}
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="rounded-2xl border border-dashed border-[var(--line)] px-6 py-16 text-center">
				<p class="text-lg font-medium">No projects found</p>
				<p class="mt-2 text-sm text-[var(--muted)]">Try another search term.</p>
			</div>
		{/if}
	</section>
</Fade>
