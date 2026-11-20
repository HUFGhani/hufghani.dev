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
		title === 'api.hufghani.dev' ? title : title.replace(/[_.-]/g, ' ').replace(/\s+/g, ' ').trim();

	const languageIcons: Record<string, string> = {
		'c': 'c/c-original.svg',
		'c++': 'cplusplus/cplusplus-original.svg',
		'c#': 'csharp/csharp-original.svg',
		'css': 'css3/css3-original.svg',
		'dart': 'dart/dart-original.svg',
		'go': 'go/go-original.svg',
		'html': 'html5/html5-original.svg',
		'java': 'java/java-original.svg',
		'javascript': 'javascript/javascript-original.svg',
		'kotlin': 'kotlin/kotlin-original.svg',
		'php': 'php/php-original.svg',
		'python': 'python/python-original.svg',
		'ruby': 'ruby/ruby-original.svg',
		'rust': 'rust/rust-original.svg',
		'shell': 'bash/bash-original.svg',
		'swift': 'swift/swift-original.svg',
		'typescript': 'typescript/typescript-original.svg'
	};

	const getLanguageIcon = (language: string) => languageIcons[language.toLowerCase()];
	const getProjectLanguage = (repoName: string, language?: string | null) =>
		repoName.toLowerCase() === 'museum of transport greater manchester' ? 'Java' : language;

	const excludedProjects = new Set(NON_PROJECT.map((name) => name.toLowerCase().trim()));

	const projects = repos.filter((repo) => {
		const normalizedName = cleanProjectTitle(repo.name).toLowerCase().trim();
		return !repo.isArchived && !repo.isTemplate && !excludedProjects.has(normalizedName);
	});

	const filteredProjects = $derived(
		projects.filter((repo) => {
			const searchable = `${repo.name} ${cleanProjectTitle(repo.name)} ${repo.description ?? ''} ${repo.primaryLanguage?.name ?? ''}`;
			const normalizedSearch = query.trim().toLowerCase().replace(/\s+/g, ' ');
			return searchable.toLowerCase().replace(/\s+/g, ' ').includes(normalizedSearch);
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
				<div class="input input-bordered flex w-full items-center gap-3 rounded-xl">
					<svg aria-hidden="true" class="h-4 w-4 shrink-0 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
					<input id="project-search" bind:value={query} placeholder="Find a project…" class="grow bg-transparent text-sm focus:outline-none" />
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
						class="card card-border group min-h-56 bg-base-200/30 transition-all duration-200 hover:-translate-y-1 hover:bg-base-200/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<div class="card-body p-6"><div class="mb-7 flex items-start justify-between gap-4">
							<div class="avatar placeholder"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
								<svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 17l-5-5 5-5M16 7l5 5-5 5M14 4l-4 16"/></svg>
							</div></div>
							<svg aria-hidden="true" class="h-4 w-4 text-base-content/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M8 7h9v9"/></svg>
						</div>
						<h2 class="card-title mb-3 text-lg font-semibold capitalize tracking-tight">{cleanProjectTitle(repo.name)}</h2>
						<p class="line-clamp-3 flex-1 text-sm leading-6 text-base-content/65">{repo.description || 'A personal project and exploration in software development.'}</p>
						<div class="mt-6 flex items-center gap-2">
							{#if getProjectLanguage(repo.name, repo.primaryLanguage?.name)}
								<span class="badge badge-outline badge-sm gap-1.5">
									{#if getLanguageIcon(getProjectLanguage(repo.name, repo.primaryLanguage?.name)!)}
										<img
											src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${getLanguageIcon(getProjectLanguage(repo.name, repo.primaryLanguage?.name)!)}`}
											alt=""
											aria-hidden="true"
											class="h-3.5 w-3.5 object-contain"
											loading="lazy"
										/>
									{:else}
										<svg aria-hidden="true" class="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16"/></svg>
									{/if}
									{getProjectLanguage(repo.name, repo.primaryLanguage?.name)}
								</span>
							{:else}
							<span class="badge badge-ghost badge-sm">Repository</span>
						{/if}
						</div></div>
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
