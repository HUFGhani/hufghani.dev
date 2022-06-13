<script>
	import Random from '$lib/icon/Random.svelte'
	import { AUTHORNAME, MENULINK } from '$lib/info'
</script>

<div
	class="flex items-center 
	sm:flex-col md:flex-row lg:flex-row xl:flex-row 
	justify-center lg:justify-between xl:justify-between 
	flex-wrap w-full pt-10 
	sm:px-4 md:px-4 lg:px-8 xl:px-8 
	bg-transparent"
>
	<div>
		<a href="/">
			<h1 class="logo font-normal text-4xl">
				{AUTHORNAME}
			</h1>
		</a>
	</div>

	<div class="flex flex-row md:pl-10 space-x-4 items-center justify-center text-base text-center">
		{#each MENULINK as { link, title, isExternal, abbr, fullTitle }}
			<div class="rounded-md p-2 text-center hover:bg-slate-100">
				{#if isExternal}
					{#if abbr}
						<a href={link} aria-label={title} target="_blank">
							<abbr title={fullTitle} class="border-none cursor-default no-underline">
								{title}
							</abbr>
						</a>
					{:else}
						<a href={link} aria-label={title} target="_blank">{title}</a>
					{/if}
				{:else}
					<a href={link} aria-label={title}>{title} </a>
				{/if}
			</div>
		{/each}
		<button
			class="rounded-md p-2 text-center hover:bg-slate-100"
			aria-label="random theme selector"
		>
			<Random cssClasses="w-6 h-6" />
		</button>
	</div>
</div>

<style>
	.logo {
		font-family: Dr Sugiyama, cursive;
		background-image: linear-gradient(60deg, #7928ca, #ffb03a);
		background-clip: text;
		color: transparent;
	}
</style>
