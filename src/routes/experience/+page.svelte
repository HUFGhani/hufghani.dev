<script lang="ts">
	import { MetaTags } from '$lib/components/MetaTags';
</script>

<MetaTags
	pageTitle="Professional Experience"
	pageDescription="Professional experience, education and technical skills for Hamza Ghani, software engineer."
	pagePath="/experience/"
	ogType="website"
/>

<article class="mx-auto w-full max-w-4xl">
	<div class="mb-12 flex flex-col gap-6 border-b border-base-content/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="text-xs font-medium uppercase tracking-[0.2em] text-primary">Professional profile</p>
			<h1 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Hamza Ghani<span class="text-primary">.</span></h1>
			<p class="mt-3 text-lg text-base-content/65">Software Engineer · Frontend, TypeScript & Cloud Engineering</p>
			<nav aria-label="Professional profiles" class="mt-4 flex flex-wrap gap-4 text-sm">
				<a class="link link-primary" href="https://www.linkedin.com/in/hamza-u-f-ghani/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
				<a class="link link-primary" href="https://github.com/HUFGhani" target="_blank" rel="noreferrer">GitHub ↗</a>
			</nav>
		</div>
	</div>

	<section aria-labelledby="profile-heading" class="mb-10">
		<h2 id="profile-heading" class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Profile</h2>
		<p class="max-w-3xl text-sm leading-7 text-base-content/80">
			Software engineer with experience building and evolving web applications, frontend platforms and cloud-backed services. Focused on maintainable TypeScript and React applications, clear user experiences, reliable delivery and collaborative engineering practices.
		</p>
	</section>

	<section aria-labelledby="skills-heading" class="mb-12">
		<h2 id="skills-heading" class="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Core skills</h2>
		<div class="space-y-5">
			<div>
				<h3 class="mb-3 text-sm font-semibold">Frontend</h3>
				<div class="flex flex-wrap gap-2">
					{#each ['TypeScript', 'JavaScript', 'React', 'Svelte', 'HTML', 'CSS', 'Micro-frontends'] as skill}
						<span class="badge badge-soft badge-info px-3 py-3 text-xs font-medium transition-colors">{skill}</span>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="mb-3 text-sm font-semibold">Backend & APIs</h3>
				<div class="flex flex-wrap gap-2">
					{#each ['Node.js', 'Java', 'Spring Boot', 'REST APIs', 'GraphQL', 'Kafka'] as skill}
						<span class="badge badge-soft badge-secondary px-3 py-3 text-xs font-medium transition-colors">{skill}</span>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="mb-3 text-sm font-semibold">Cloud & delivery</h3>
				<div class="flex flex-wrap gap-2">
					{#each ['AWS', 'AWS CDK', 'Lambda', 'S3', 'CloudFront', 'CI/CD'] as skill}
						<span class="badge badge-soft badge-success px-3 py-3 text-xs font-medium transition-colors">{skill}</span>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="mb-3 text-sm font-semibold">Testing & quality</h3>
				<div class="flex flex-wrap gap-2">
					{#each ['Vitest', 'Playwright', 'Contract testing', 'Observability', 'Code review'] as skill}
						<span class="badge badge-soft badge-warning px-3 py-3 text-xs font-medium transition-colors">{skill}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section aria-labelledby="experience-heading" class="mb-12">
		<h2 id="experience-heading" class="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Professional experience</h2>
		<div class="relative space-y-9 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-base-content/15">
			<div class="relative pl-8">
				<span aria-hidden="true" class="absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-primary bg-base-100"></span>
				<div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
					<h3 class="font-semibold">Software Engineer <span class="text-base-content/50">· Booking.com</span></h3>
					<p class="text-xs text-base-content/50">October 2020 – Present</p>
				</div>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-base-content/75">
					<li>Build and maintain web experiences using TypeScript and modern frontend technologies, working across shared UI components and micro-frontend architecture.</li>
					<li>Deliver product integrations that connect frontend applications with backend APIs and cloud services.</li>
					<li>Contribute to engineering quality through automated testing, code reviews, observability and maintainable delivery practices.</li>
					<li>Collaborate with product and engineering partners, share technical knowledge and support the development of other engineers.</li>
				</ul>
			</div>
			<div class="relative pl-8">
				<span aria-hidden="true" class="absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-base-content/30 bg-base-100"></span>
				<div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
					<h3 class="font-semibold">Graduate Software Engineer <span class="text-base-content/50">· Booking.com</span></h3>
					<p class="text-xs text-base-content/50">September 2018 – October 2020</p>
				</div>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-base-content/75">
					<li>Rotated across engineering teams, developing reusable frontend and backend solutions with Java, JavaScript, TypeScript, React and Spring Boot.</li>
					<li>Worked with microservices, Kafka and API integrations, including resilience and contract-testing practices.</li>
					<li>Contributed in collaborative Agile teams using pairing, code review and continuous improvement.</li>
				</ul>
			</div>
			<div class="relative pl-8">
				<span aria-hidden="true" class="absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-base-content/30 bg-base-100"></span>
				<div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
					<h3 class="font-semibold">Junior Software Developer <span class="text-base-content/50">· Team Netsol</span></h3>
					<p class="text-xs text-base-content/50">July 2015 – August 2018</p>
				</div>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-base-content/75">
					<li>Gathered requirements, maintained and tested web applications and product features.</li>
					<li>Developed solutions using Java, Scala, Python/Jython and Spring technologies, deployed on local infrastructure and AWS.</li>
				</ul>
			</div>
		</div>
	</section>

	<section aria-labelledby="education-heading" class="mb-10">
		<h2 id="education-heading" class="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Education</h2>
		<div class="space-y-4 text-sm">
			<div>
				<h3 class="font-semibold">PGDip, Advanced Computer Science (Software Engineering)</h3>
				<p class="text-base-content/60">The University of Manchester · 2017–2018</p>
			</div>
			<div>
				<h3 class="font-semibold">BSc (Hons), Software Engineering with Sandwich Year · First Class</h3>
				<p class="text-base-content/60">Manchester Metropolitan University · 2014–2017</p>
			</div>
			<div>
				<h3 class="font-semibold">FdSc, Computing with Database Development · Distinction</h3>
				<p class="text-base-content/60">The Manchester College · 2012–2014</p>
			</div>
		</div>
	</section>

	<section aria-labelledby="certification-heading" class="border-t border-base-content/10 pt-6">
		<h2 id="certification-heading" class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Certification</h2>
		<p class="text-sm"><span class="font-semibold">AWS Certified Developer – Associate</span><span class="text-base-content/60"> · November 2026</span></p>
	</section>
</article>

