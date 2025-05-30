<script lang="ts">
	import { Fade } from '$lib/components/Fade';
	import { MetaTags } from '$lib/components/MetaTags';
	import { NON_PROJECT } from '$lib/config';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { repositories: repoNodes } = data.viewer;
	const { nodes: repos } = repoNodes;

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	const cleanProjetTitle = (title: string) => {
		return title !== 'api.hufghani.dev' ? title.replace(/_|-|\./g, ' ') : title;
	};

	const languageIcon = (programmingLanguage: string): string => {
		if (programmingLanguage.toUpperCase() === 'Shell'.toUpperCase()) {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/bash/bash-original.svg" alt="bash" title="bash" loading="lazy" rel="preload">`;
		} else if (programmingLanguage.toUpperCase() === 'Objective-C'.toUpperCase()) {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/objectivec/objectivec-plain.svg" alt="Objective C" title="Objective C" loading="lazy" rel="preload">`;
		} else if (programmingLanguage.toUpperCase() === 'tex'.toUpperCase()) {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/latex/latex-original.svg" alt="latex" loading="lazy" title="latex" rel="preload">`;
		} else {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/${programmingLanguage.toLowerCase()}/${programmingLanguage.toLowerCase()}-original.svg" alt="${programmingLanguage}" title="${programmingLanguage}" loading="lazy" rel="preload">`;
		}
	};
</script>

<MetaTags
	ogType="website"
	pageTitle="Project"
	pageDescription="The list of Project that I have worked on or working on"
/>

<Fade {visible}>
	<div class="justify-left flex w-full flex-col px-5">
		<h1 class="text-3xl font-bold">Project</h1>
		<div class="pt-8 lg:px-10">
			<table class="table w-full table-fixed text-center">
				<thead>
					<tr>
						<th>Projects</th>
						<th>Description</th>
						<th>Language</th>
					</tr>
				</thead>
				<tbody>
					{#each repos as repo}
						{#if !repo.isArchived && !repo.isTemplate}
							{#if !NON_PROJECT.includes(cleanProjetTitle(repo.name))}
								<tr class="hover">
									<td class="whitespace-pre-line">
										<a href={repo.url} target="_blank" rel="noreferrer"
											>{cleanProjetTitle(repo.name)}</a
										>
									</td>
									<td class="w-9/12 whitespace-pre-line"
										>{#if repo.description != null}
											{repo.description}
										{/if}
									</td>
									<td class="text-center align-middle">
										{#if repo.primaryLanguage != null || repo.primaryLanguage != undefined}
											{@html languageIcon(repo.primaryLanguage['name'])}
										{/if}
									</td>
								</tr>
							{/if}
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</Fade>
