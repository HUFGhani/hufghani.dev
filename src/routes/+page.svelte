<script lang="ts">
	import { getContext } from 'svelte';
	import { resolve } from '$app/paths';
	import { MetaTags } from '$lib/components/MetaTags';

	const featureFlags = getContext<Record<string, boolean>>('featureFlags');
</script>

<MetaTags
	pageTitle="Hamza Ghani — Software Engineer"
	pageDescription="Hamza Ghani is a software engineer based in Manchester, building thoughtful digital experiences and sharing what he learns along the way."
	ogType="website"
/>

<section class="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
	<div class="max-w-3xl">
		<p class="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-base-content/50">
			<span class="h-px w-8 bg-primary"></span>
			Software engineer · Manchester, UK
		</p>
		<h1 class="text-5xl leading-[1.08] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
			Hello, I'm Hamza<span class="text-primary">.</span>
		</h1>
		<p class="mt-8 max-w-2xl text-lg leading-8 text-base-content/65 sm:text-xl sm:leading-9">
			I’m a software engineer who enjoys turning complex problems into clear, useful experiences. I work across the stack, keep learning, and like sharing what I discover along the way.
		</p>
		<div class="mt-10 flex flex-wrap items-center gap-4">
			<a href={resolve('/project')} class="btn btn-primary rounded-full">Explore my work <span aria-hidden="true">↗</span></a>
		</div>
	</div>

	<aside class="card card-border bg-base-200/40">
		<div class="card-body p-6 sm:p-8">
			<p class="text-xs font-medium uppercase tracking-[0.2em] text-base-content/50">A little about me</p>
			<p class="mt-5 text-base leading-7 text-base-content/80">
				Based in Manchester, United Kingdom. Outside of work, I’m a husband and dad, a curious learner, and usually exploring technology, photography or a new idea.
			</p>
			<div class="mt-8 border-t border-base-content/10 pt-6">
				<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">Currently</p>
				<p class="mt-2 text-sm">Software Engineer at <a href="https://www.booking.com/" target="_blank" rel="noreferrer" class="link link-hover link-primary">Booking.com</a></p>
			</div>
		</div>
	</aside>
</section>

<section class="mt-28 border-t border-base-content/10 pt-10 sm:mt-36">
	<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
		<div>
			<p class="text-xs font-medium uppercase tracking-[0.2em] text-base-content/50">The overview</p>
			<h2 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What I’m about</h2>
		</div>
		<p class="max-w-md text-sm leading-6 text-base-content/50">A few places to explore if you’d like to know more about what I do and what I’m learning.</p>
	</div>

	<div class="mt-9 grid gap-4 md:grid-cols-3">
		<a href={resolve('/project')} class="card card-border bg-base-200/20 transition duration-200 hover:-translate-y-1 hover:bg-base-200/50">
			<div class="card-body">
				<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">01 / Work</p>
				<h3 class="card-title mt-5">Projects <span class="text-primary transition group-hover:translate-x-1">↗</span></h3>
				<p class="text-sm leading-6 text-base-content/65">Things I’ve built, experiments, and open-source contributions.</p>
			</div>
		</a>
		{#if featureFlags?.showBlog === true}
		<a href={resolve('/blog' as never)} class="card card-border bg-base-200/20 transition duration-200 hover:-translate-y-1 hover:bg-base-200/50">
			<div class="card-body">
				<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">02 / Notes</p>
				<h3 class="card-title mt-5">Writing <span class="text-primary">↗</span></h3>
				<p class="text-sm leading-6 text-base-content/65">Notes and lessons from software engineering and the things I explore.</p>
			</div>
		</a>
		{/if}
		<a href={resolve('/docs/Curriculum-Vitae.pdf' as never)} target="_blank" rel="noreferrer" class="card card-border bg-base-200/20 transition duration-200 hover:-translate-y-1 hover:bg-base-200/50">
			<div class="card-body">
				<p class="text-xs uppercase tracking-[0.18em] text-base-content/50">{featureFlags?.showBlog === true ? '03' : '02'} / Background</p>
				<h3 class="card-title mt-5">Experience <span class="text-primary">↗</span></h3>
				<p class="text-sm leading-6 text-base-content/65">My professional background, roles and experience.</p>
			</div>
		</a>
	</div>
</section>

<section class="mt-28 flex flex-col gap-5 border-t border-base-content/10 pt-10 sm:mt-36 sm:flex-row sm:items-center sm:justify-between">
	<div>
		<p class="text-xs font-medium uppercase tracking-[0.2em] text-base-content/50">Say hello</p>
		<h2 class="mt-3 text-2xl font-semibold tracking-tight">Have something in mind?</h2>
		<p class="mt-2 text-sm text-base-content/65">I’m always happy to connect and talk about interesting ideas.</p>
	</div>
	<a href="https://www.linkedin.com/in/hamza-u-f-ghani/" target="_blank" rel="noreferrer" class="btn btn-outline rounded-full">
		Connect on LinkedIn <span aria-hidden="true">↗</span>
	</a>
</section>
