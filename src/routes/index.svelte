<script lang="ts">
	import MetaTags from '$lib/components/Meta-Tags.svelte'
</script>

<MetaTags
	pageTitle={'Hello World'}
	pageDescription={"My own little space on the internet, where I write about what I've learned from my day job."}
/>
<div class="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-evenly w-full px-5">
	<div class="flex flex-col text-left justify-start items-start ">
		<h1 class="text-8xl font-bold">Hi, I'm Hamza.</h1>
		<p class="pt-4 break-words lg:w-10/12 text-xl pb-5 ">
			A Father, Husband, Brother, Son and Software Engineer from Manchester, United Kingdom.
		</p>
	</div>
	<div class="flex flex-col break-words lg:w-6/12 gap-10 text-lg prose">
		<div>
			<h1 class="underline underline-offset-8 text-xl">Professionally:</h1>
			<p>s</p>
		</div>
		<div>
			<h1 class="underline underline-offset-8 text-xl">Personally:</h1>
			<p>a</p>
		</div>
	</div>
</div>
