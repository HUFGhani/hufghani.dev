<script lang="ts">
	import { Fade } from '$lib/components/Fade';
	import { MetaTags } from '$lib/components/MetaTags';
	import { ProjectCard } from '$lib/components/ProjectCard';
	import { ProjectEmptyState } from '$lib/components/ProjectEmptyState';
	import { ProjectPagination } from '$lib/components/ProjectPagination';
	import { ProjectSearch } from '$lib/components/ProjectSearch';
	import { NON_PROJECT } from '$lib/config';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { nodes: repos } = data.viewer.repositories;

	const pageSize = 9;
	let visible = $state(false);
	let query = $state('');
	let currentPage = $state(1);
	let urlReady = $state(false);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		query = params.get('q') ?? '';
		const requestedPage = Number(params.get('page'));
		currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
		visible = true;
		urlReady = true;
	});

	const cleanProjectTitle = (title: string) =>
		title === 'api.hufghani.dev' ? title : title.replace(/[_.-]/g, ' ').replace(/\\s+/g, ' ').trim();

	const normalizeSearchText = (value: string) => value.trim().toLowerCase().replace(/\\s+/g, ' ');

	const languageIcons: Record<string, string> = {
		c: 'c/c-original.svg',
		'c++': 'cplusplus/cplusplus-original.svg',
		'c#': 'csharp/csharp-original.svg',
		css: 'css3/css3-original.svg',
		dart: 'dart/dart-original.svg',
		go: 'go/go-original.svg',
		html: 'html5/html5-original.svg',
		java: 'java/java-original.svg',
		javascript: 'javascript/javascript-original.svg',
		kotlin: 'kotlin/kotlin-original.svg',
		php: 'php/php-original.svg',
		python: 'python/python-original.svg',
		ruby: 'ruby/ruby-original.svg',
		rust: 'rust/rust-original.svg',
		shell: 'bash/bash-original.svg',
		swift: 'swift/swift-original.svg',
		typescript: 'typescript/typescript-original.svg'
	};

	const excludedProjects = new Set(NON_PROJECT.map(normalizeSearchText));

	const projects = repos
		.filter((repo) => {
			const normalizedName = normalizeSearchText(cleanProjectTitle(repo.name));
			return !repo.isArchived && !repo.isTemplate && !excludedProjects.has(normalizedName);
		})
		.map((repo) => {
			const title = cleanProjectTitle(repo.name);
			const language =
				repo.name.toLowerCase() === 'museum of transport greater manchester'
					? 'Java'
					: (repo.primaryLanguage?.name ?? null);

			return {
				...repo,
				title,
				language,
				languageIcon: language ? languageIcons[language.toLowerCase()] : undefined,
				searchText: normalizeSearchText(
					`${repo.name} ${title} ${repo.description ?? ''} ${language ?? ''}`
				)
			};
		});

	const normalizedQuery = $derived(normalizeSearchText(query));
	const filteredProjects = $derived(
		projects.filter((project) => project.searchText.includes(normalizedQuery))
	);
	const totalPages = $derived(Math.ceil(filteredProjects.length / pageSize));
	const safePage = $derived(totalPages === 0 ? 1 : Math.min(currentPage, totalPages));
	const paginatedProjects = $derived(
		filteredProjects.slice((safePage - 1) * pageSize, safePage * pageSize)
	);
	const firstResult = $derived(filteredProjects.length === 0 ? 0 : (safePage - 1) * pageSize + 1);
	const lastResult = $derived(Math.min(safePage * pageSize, filteredProjects.length));

	$effect(() => {
		if (!urlReady) return;
		const url = new URL(window.location.href);
		if (query.trim()) url.searchParams.set('q', query.trim());
		else url.searchParams.delete('q');
		if (safePage > 1) url.searchParams.set('page', String(safePage));
		else url.searchParams.delete('page');
		window.history.replaceState(window.history.state, '', url);
	});
</script>

<MetaTags
	pagePath="/project/"
	ogType="website"
	pageTitle="Projects"
	pageDescription="Selected projects, experiments and open-source work by Hamza Ghani."
/>

<Fade {visible}>
	<section class="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
		<div class="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
			<div class="max-w-2xl">
				<p class="mb-4 text-sm font-medium tracking-[0.18em] text-primary uppercase">Things I've built</p>
				<h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Projects<span class="text-primary">.</span></h1>
				<p class="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
					A collection of side projects, experiments and open-source work. A little bit of everything—from useful tools to ideas explored in code.
				</p>
			</div>
			<ProjectSearch
				value={query}
				onChange={(value) => {
					query = value;
					currentPage = 1;
				}}
			/>
		</div>

		<div class="mb-5 flex items-center justify-between border-b border-[var(--line)] pb-4">
			<p class="text-sm text-[var(--muted)]">{filteredProjects.length} <span class="text-[var(--subtle)]">projects</span></p>
			<p class="hidden text-xs tracking-wide text-[var(--subtle)] sm:block">OPEN SOURCE & PERSONAL WORK</p>
		</div>

		{#if filteredProjects.length}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each paginatedProjects as project (project.name)}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<ProjectEmptyState />
		{/if}

		<ProjectPagination
			currentPage={safePage}
			{totalPages}
			{firstResult}
			{lastResult}
			totalResults={filteredProjects.length}
			onPageChange={(page) => (currentPage = page)}
		/>
	</section>
</Fade>
