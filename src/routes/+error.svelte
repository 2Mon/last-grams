<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
</script>

<main
	class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-8"
>
	<div class="text-8xl sm:text-9xl" style="animation: float-scale 3s ease-in-out infinite;">
		⚖️
	</div>

	<div class="space-y-3">
		<h1
			class="font-headline font-black text-5xl sm:text-7xl tracking-tighter text-on-surface dark:text-background"
		>
			This page is under 0 grams
		</h1>
		<p class="font-body text-xl sm:text-2xl text-on-surface/70 dark:text-background/70">
			It's so light it floated away!
		</p>
	</div>

	<p class="font-label text-sm text-on-surface/50 dark:text-background/50">
		{page.status} · {page.error?.message ?? 'Not found'}
	</p>

	<a
		href="{base}/"
		class="inline-block bg-primary text-on-primary font-headline font-bold text-lg px-8 py-4 border-3 border-on-surface dark:border-background hard-shadow hover-lift rounded-xl"
	>
		Take me home 🏠
	</a>

	<p class="font-body text-on-surface/40 dark:text-background/40 text-sm animate-pulse">
		searching for missing grams...
	</p>
</main>
