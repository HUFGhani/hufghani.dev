<script lang="ts">
	let {
		value,
		onChange
	}: {
		value: string;
		onChange: (value: string) => void;
	} = $props();
</script>

<div class="w-full sm:max-w-xs">
	<label for="project-search" class="sr-only">Search projects</label>
	<div class="input input-bordered flex w-full items-center gap-3 rounded-xl">
		<svg aria-hidden="true" class="h-4 w-4 shrink-0 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-4-4" />
		</svg>
		<input
			id="project-search"
			value={value}
			oninput={(event) => onChange(event.currentTarget.value)}
			placeholder="Find a project…"
			class="grow bg-transparent text-sm focus:outline-none"
		/>
	</div>
</div>
