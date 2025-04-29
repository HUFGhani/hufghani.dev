<script lang="ts">
	import { Fade } from '$lib/components/Fade';
	import { MetaTags } from '$lib/components/MetaTags';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<MetaTags
	pageTitle={'Hello World'}
	pageDescription={"My own little space on the internet, where I write about what I've learned from my day job."}
	ogType="website"
/>
<Fade {visible}>
	<div class="flex w-full flex-col justify-evenly px-5 md:flex-col lg:flex-row xl:flex-row">
		<div class="flex flex-col items-start justify-start text-left lg:pr-52">
			<h1 class="text-8xl font-bold">Hi, I'm Hamza;</h1>
			<p class="pt-4 pb-5 text-xl break-words lg:w-10/12">
				A Father, Husband, Brother, Son and Software Engineer from Manchester, United Kingdom.
			</p>
		</div>
		<div class="prose flex flex-col gap-10 text-lg break-words lg:w-6/12">
			<div>
				<h2 class="text-xl underline underline-offset-8">Professionally:</h2>
				<p>
					Software Engineer at <a href="https://Booking.com" target="_blank" rel="noreferrer"
						>Booking.com</a
					> (But Personally class myself as full-Stack Engineer/Devloper); Attempting to be a amateur
					tech blog author; Open-Source Contributor.
				</p>
			</div>
			<div>
				<h2 class="text-xl underline underline-offset-8">Previously:</h2>
				<p>
					Graduate Software Engineer at <a
						href="https://Booking.com"
						target="_blank"
						rel="noreferrer">Booking.com</a
					>; Inter/ Junior Software Engineer at
					<a href="https://teamnetsol.com" target="_blank" rel="noreferrer">Team Netsol</a>;
					Hackathon Director for GreatUniHack and StudentHack.
				</p>
			</div>
			<div>
				<h2 class="text-xl underline underline-offset-8">Personally:</h2>
				<p>
					Hobby Code; Husband; dad jokes with a dad bod; curious learner; coffee drinker/fanatic;
					Photography; indoor climbing; you can tell I'm a Java developer with all the semicolons 😂
				</p>
			</div>
		</div>
	</div>
</Fade>
