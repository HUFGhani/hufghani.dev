<script lang="ts">
	import Fade from '$lib/components/Fade.svelte'
	import MetaTags from '$lib/components/Meta-Tags.svelte'
	import { NON_PROJECT } from '$lib/info'
	import { onMount } from 'svelte'
	export let data

	const { repositories: repoNodes } = data.viewer
	const { nodes: repos } = repoNodes

	let visible = false

	onMount(() => {
		visible = true
	})

	const cleanProjetTitle = (title: string) => {
		return title !== 'api.hufghani.dev' ? title.replace(/_|-|\./g, ' ') : title
	}

	const languageIcon = (programmingLanguage: String): string => {
		if (programmingLanguage.toUpperCase() === 'Shell'.toUpperCase()) {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/bash/bash-original.svg" alt="bash" title="bash" loading="lazy" rel="preload">`
		} else if (programmingLanguage.toUpperCase() === 'Objective-C'.toUpperCase()) {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/objectivec/objectivec-plain.svg" alt="Objective C" title="Objective C" loading="lazy" rel="preload">`
		} else if (programmingLanguage.toUpperCase() === 'tex'.toUpperCase()) {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/latex/latex-original.svg" alt="latex" loading="lazy" title="latex" rel="preload">`
		} else {
			return `<img class="block m-auto w-7 h-7" src="img/devIcons/${programmingLanguage.toLowerCase()}/${programmingLanguage.toLowerCase()}-original.svg" alt="${programmingLanguage}" title="${programmingLanguage}" loading="lazy" rel="preload">`
		}
	}
</script>

<MetaTags
	ogType='website'
	pageTitle='Project'
	pageDescription='The list of Project that I have worked on or working on'
/>

<Fade {visible}>
	<div class="flex flex-col justify-left w-full px-5">
		<h1 class="text-3xl font-bold">Project</h1>
		<div class="pt-8 lg:px-10">
			<table class="table table-fixed w-full text-center">
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
									<td class="align-middle text-center">
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
