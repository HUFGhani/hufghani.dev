<script lang="ts">
	import { AUTHORNAME, SOCIAL_LINKS } from '$lib/config';
</script>

<footer data-testid="footer" class="flex flex-col gap-5 border-t border-white/10 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
	<p data-testid="copyRight-year">© 2017–{new Date().getFullYear()} {AUTHORNAME}</p>
	<nav aria-label="Social links" class="flex flex-wrap items-center gap-5">
		{#each SOCIAL_LINKS as { id, title, link }}
			<a
				{href: link}
				target="_blank"
				rel="noreferrer"
				class="transition-colors hover:text-zinc-100"
			>
				{title}
			</a>
		{/each}
	</nav>
</footer>
