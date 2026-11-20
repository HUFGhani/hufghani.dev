<script lang="ts">
	interface Project {
		url: string;
		title: string;
		description?: string | null;
		language?: string | null;
		languageIcon?: string;
	}

	let { project }: { project: Project } = $props();
</script>

<a
	href={project.url}
	target="_blank"
	rel="noopener noreferrer"
	class="card card-border group min-h-56 bg-base-200/30 transition-all duration-200 hover:-translate-y-1 hover:bg-base-200/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
>
	<div class="card-body p-6">
		<div class="mb-7 flex items-start justify-between gap-4">
			<div class="avatar placeholder">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
					<svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
						<path d="M8 17l-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
					</svg>
				</div>
			</div>
			<svg aria-hidden="true" class="h-4 w-4 text-base-content/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
				<path d="M7 17 17 7M8 7h9v9" />
			</svg>
		</div>

		<h2 class="card-title mb-3 text-lg font-semibold capitalize tracking-tight">{project.title}</h2>
		<p class="line-clamp-3 flex-1 text-sm leading-6 text-base-content/65">
			{project.description || 'A personal project and exploration in software development.'}
		</p>

		<div class="mt-6 flex items-center gap-2">
			{#if project.language}
				<span class="badge badge-outline badge-sm gap-1.5">
					{#if project.languageIcon}
						<img
							src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${project.languageIcon}`}
							alt=""
							aria-hidden="true"
							class="h-3.5 w-3.5 object-contain"
							loading="lazy"
						/>
					{:else}
						<svg aria-hidden="true" class="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
							<path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
						</svg>
					{/if}
					{project.language}
				</span>
			{:else}
				<span class="badge badge-ghost badge-sm">Repository</span>
			{/if}
		</div>
	</div>
</a>
