<script lang="ts">
	let {
		title = 'No projects found',
		description = 'Try another search term.'
	}: {
		title?: string;
		description?: string;
	} = $props();
</script>

<div class="rounded-2xl border border-dashed border-[var(--line)] px-6 py-16 text-center" role="status">
	<p class="text-lg font-medium">{title}</p>
	<p class="mt-2 text-sm text-[var(--muted)]">{description}</p>
</div>
