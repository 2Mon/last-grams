<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let dotBg: HTMLDivElement;
	let darkMode = $state(false);

	const isActive = (path: string) =>
		page.url.pathname === base + path ||
		(path === '/' && (page.url.pathname === base + '/' || page.url.pathname === base));

	onMount((): (() => void) => {
		const stored = localStorage.getItem('darkMode');
		if (stored !== null) {
			darkMode = stored === 'true';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		const handleScroll = (): void => {
			dotBg.style.transform = `translateY(${window.scrollY * -0.3}px)`;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return (): void => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		localStorage.setItem('darkMode', String(darkMode));
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="{darkMode ? 'dark' : ''} min-h-screen bg-background dark:bg-dark-surface-dim">
<div class="dot-bg" bind:this={dotBg}></div>

<!-- Nav -->
<nav
	class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-background dark:bg-dark-surface-dim border-b-4 border-on-surface dark:border-background"
>
	<div
		class="text-2xl font-headline font-black italic tracking-tighter text-on-surface dark:text-background"
	>
		<a href="{base}/">Last Grams</a>
	</div>
	<div class="hidden md:flex gap-8 items-center mr-auto ml-8">
		<a
			class="font-label font-bold text-sm {isActive('/')
				? 'text-primary underline decoration-4 underline-offset-4'
				: 'text-on-background dark:text-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
			href="{base}/">Home</a
		>
		<a
			class="font-label font-bold text-sm {isActive('/gallery')
				? 'text-primary underline decoration-4 underline-offset-4'
				: 'text-on-background dark:text-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
			href="{base}/gallery">Gallery</a
		>
	</div>
	<div class="flex items-center gap-4">
		<button
			onclick={() => (darkMode = !darkMode)}
			class="w-10 h-10 flex items-center justify-center border-4 border-on-surface dark:border-background text-on-surface dark:text-background hover:bg-surface-container dark:hover:bg-dark-container-high transition-colors rounded-xl"
			aria-label="Toggle dark mode"
		>
			<span class="material-symbols-outlined text-xl">
				{darkMode ? 'light_mode' : 'dark_mode'}
			</span>
		</button>
		<a
			class="bg-primary text-on-primary border-4 border-on-surface dark:border-background px-6 py-2 font-headline font-black tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-xl"
			href="{base}/submission"
		>
			Submit
		</a>
	</div>
</nav>

{@render children()}

<!-- Footer -->
<footer
	class="w-full grid grid-cols-1 md:grid-cols-2 items-center text-center p-4 md:p-8 gap-4 bg-primary dark:bg-secondary border-t-4 border-on-surface dark:border-background"
>
	<div
		class="font-label font-bold text-sm text-on-primary md:border-r-4 border-on-surface dark:border-background h-full flex items-center justify-center"
	>
		Built by 1Mon for Hack Club 2026
	</div>
	<div class="flex justify-center gap-6 h-full items-center">
		<a
			class="font-label font-bold text-sm text-on-primary hover:bg-on-surface hover:text-surface dark:hover:bg-background dark:hover:text-on-surface transition-colors p-2 rounded-lg"
			href="https://github.com/2Mon/last-grams"
			target="_blank"
			rel="noopener noreferrer">GitHub</a
		>
		<a
			class="font-label font-bold text-sm text-on-primary hover:bg-on-surface hover:text-surface dark:hover:bg-background dark:hover:text-on-surface transition-colors p-2 rounded-lg"
			href="https://hackclub.com"
			target="_blank"
			rel="noopener noreferrer">Hack Club HQ</a
		>
	</div>
</footer>
</div>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

<style>
	.dot-bg {
		position: fixed;
		inset: -30%;
		z-index: -1;
		opacity: 0.2;
		pointer-events: none;
		background-image: radial-gradient(#3a3f3d 1.5px, transparent 1.5px);
		background-size: 28px 28px;
	}

	:global(.dark) .dot-bg {
		background-image: radial-gradient(#f5f4f0 1.5px, transparent 1.5px);
	}
</style>
