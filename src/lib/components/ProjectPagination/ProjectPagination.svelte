<script lang="ts">
	let {
		currentPage,
		totalPages,
		firstResult,
		lastResult,
		totalResults,
		onPageChange
	}: {
		currentPage: number;
		totalPages: number;
		firstResult: number;
		lastResult: number;
		totalResults: number;
		onPageChange: (page: number) => void;
	} = $props();

	const pageNumbers = $derived(Array.from({ length: totalPages }, (_, index) => index + 1));
</script>

{#if totalPages > 1}
	<nav class="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row" aria-label="Project pagination">
		<p class="text-sm text-[var(--muted)]">Showing {firstResult}–{lastResult} of {totalResults} projects</p>
		<div class="join" aria-label="Pagination controls">
			<button
				class="join-item btn btn-sm btn-ghost"
				type="button"
				aria-label="Previous page"
				disabled={currentPage === 1}
				onclick={() => onPageChange(Math.max(1, currentPage - 1))}
			>
				<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="m15 18-6-6 6-6" />
				</svg>
			</button>
			{#each pageNumbers as pageNumber (pageNumber)}
				<button
					class="join-item btn btn-sm"
					class:btn-active={pageNumber === currentPage}
					type="button"
					aria-label={`Page ${pageNumber}`}
					aria-current={pageNumber === currentPage ? 'page' : undefined}
					onclick={() => onPageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			{/each}
			<button
				class="join-item btn btn-sm btn-ghost"
				type="button"
				aria-label="Next page"
				disabled={currentPage === totalPages}
				onclick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
			>
				<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="m9 18 6-6-6-6" />
				</svg>
			</button>
		</div>
	</nav>
{/if}
