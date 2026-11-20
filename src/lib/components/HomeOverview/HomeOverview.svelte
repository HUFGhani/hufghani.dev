<script lang="ts">
	let { showBlog = false }: { showBlog?: boolean } = $props();
</script>

<section class="mt-28 border-t border-base-content/10 pt-10 sm:mt-36">
	<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
		<div>
			<p class="text-xs font-medium uppercase tracking-[0.2em] text-base-content/50">The overview</p>
			<h2 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What I’m about</h2>
		</div>
		<p class="max-w-md text-sm leading-6 text-base-content/50">A few places to explore if you’d like to know more about what I do and what I’m learning.</p>
	</div>

	<div class="mt-9 grid gap-4 md:grid-cols-3">
		<a href="/project" class="card card-border bg-base-200/20 transition duration-200 hover:-translate-y-1 hover:bg-base-200/50">
			<div class="card-body">
				<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">Work</p>
				<h3 class="card-title mt-5">Projects <span class="text-primary transition group-hover:translate-x-1">↗</span></h3>
				<p class="text-sm leading-6 text-base-content/65">Things I’ve built, experiments, and open-source contributions.</p>
			</div>
		</a>
		{#if showBlog}
			<a href="/blog" class="card card-border bg-base-200/20 transition duration-200 hover:-translate-y-1 hover:bg-base-200/50">
				<div class="card-body">
					<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">Notes</p>
					<h3 class="card-title mt-5">Writing <span class="text-primary">↗</span></h3>
					<p class="text-sm leading-6 text-base-content/65">Notes and lessons from software engineering and the things I explore.</p>
				</div>
			</a>
		{/if}
		<a href="/docs/Curriculum-Vitae.pdf" target="_blank" rel="noreferrer" class="card card-border bg-base-200/20 transition duration-200 hover:-translate-y-1 hover:bg-base-200/50">
			<div class="card-body">
				<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">Background</p>
				<h3 class="card-title mt-5">Experience <span class="text-primary">↗</span></h3>
				<p class="text-sm leading-6 text-base-content/65">My professional background, roles and experience.</p>
			</div>
		</a>
	</div>
</section>
