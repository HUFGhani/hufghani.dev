<script lang="ts">
	import Fade from '$lib/components/Fade.svelte'
	import MetaTags from '$lib/components/Meta-Tags.svelte'
	import { onMount } from 'svelte'

	let visible = false

	onMount(() => {
		visible = true
	})
</script>

<MetaTags
	pageTitle={'Hello World'}
	pageDescription={"My own little space on the internet, where I write about what I've learned from my day job."}
/>
<Fade {visible}>
	<div class="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-evenly w-full px-5">
		<div class="flex flex-col text-left justify-start items-start lg:pr-52">
			<h1 class="text-8xl font-bold">Hi, I'm Hamza;</h1>
			<p class="pt-4 break-words lg:w-10/12 text-xl pb-5 ">
				A Father Husband, Brother, Son and Software Engineer from Manchester, United Kingdom.
			</p>
		</div>
		<div class="flex flex-col break-words lg:w-6/12 gap-10 text-lg prose">
			<div>
				<h1 class="underline underline-offset-8 text-xl">Professionally:</h1>
				<p>
					Software Engineer at <a href="https://Booking.com" target="_blank">Booking.com</a> (But Personally
					class myself as full-Stack Engineer/Devloper); Attempting to be a amateur tech blog author;
					Open-Source Contributor.
				</p>
			</div>
			<div>
				<h1 class="underline underline-offset-8 text-xl">Previously:</h1>
				<p>
					Graduate Software Engineer at <a href="https://Booking.com" target="_blank">Booking.com</a
					>; Inter/ Junior Software Engineer at
					<a href="https://teamnetsol.com" target="_blank">Team Netsol</a>; Hackathon Director for
					GreatUniHack and StudentHack.
				</p>
			</div>
			<div>
				<h1 class="underline underline-offset-8 text-xl">Personally:</h1>
				<p>
					Hobby Code; Husband; dad jokes with a dad bod; curious learner; coffee drinker/fanatic;
					Photography; indoor climbing; you can tell I'm a Java developer with all the semicolons 😂
				</p>
			</div>
		</div>
	</div>
</Fade>
