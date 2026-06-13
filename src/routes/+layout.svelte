<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let dotBg: HTMLDivElement;
	let sparkleField: HTMLDivElement;
	let darkMode = $state(false);

	const isActive = (path: string) => {
		const current = page.url.pathname.replace(/\/$/, '') || '/';
		const target = (base + path).replace(/\/$/, '') || '/';
		return current === target;
	};

	onMount((): (() => void) => {
		const stored = localStorage.getItem('darkMode');
		if (stored !== null) {
			darkMode = stored === 'true';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		const handleScroll = (): void => {
			dotBg.style.transform = `translateY(${window.scrollY * -0.3}px)`;
			if (sparkleField) sparkleField.style.transform = `translateY(${window.scrollY * 0.15}px)`;
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
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</svelte:head>

<div class="{darkMode ? 'dark' : ''} min-h-screen bg-background dark:bg-dark-surface-dim">
<div class="dot-bg" bind:this={dotBg}></div>

<div bind:this={sparkleField} class="fixed inset-0 pointer-events-none select-none overflow-hidden" style="z-index: 1; will-change: transform;" aria-hidden="true">
<!-- Full-page sparkle field -->
	<!-- Yellow sparkles -->
	<span class="text-success-neon/45 text-xl absolute" style="top: 8%; left: 5%; animation: twinkle 4s ease-in-out infinite;">✦</span>
	<span class="text-success-neon/40 text-4xl absolute" style="top: 15%; right: 8%; animation: twinkle 5s ease-in-out 1.2s infinite;">★</span>
	<span class="text-success-neon/35 text-xl absolute" style="top: 25%; left: 12%; animation: drift 6s ease-in-out 0.5s infinite;">✦</span>
	<span class="text-success-neon/45 text-3xl absolute" style="top: 35%; right: 4%; animation: twinkle 3.5s ease-in-out 2s infinite;">◆</span>
	<span class="text-success-neon/40 text-xl absolute" style="top: 45%; left: 3%; animation: twinkle 4.5s ease-in-out 0.8s infinite;">★</span>
	<span class="text-success-neon/35 text-4xl absolute" style="top: 55%; right: 10%; animation: drift 7s ease-in-out 1.5s infinite;">✦</span>
	<span class="text-success-neon/45 text-3xl absolute" style="top: 65%; left: 7%; animation: twinkle 5.5s ease-in-out 3s infinite;">★</span>
	<span class="text-success-neon/40 text-xl absolute" style="top: 75%; right: 6%; animation: twinkle 3s ease-in-out 0.3s infinite;">✦</span>
	<span class="text-success-neon/35 text-xl absolute" style="top: 85%; left: 9%; animation: drift 5s ease-in-out 2.5s infinite;">◆</span>
	<span class="text-success-neon/45 text-4xl absolute" style="top: 92%; right: 12%; animation: twinkle 4s ease-in-out 1s infinite;">★</span>
	<!-- Green sparkles -->
	<span class="text-secondary/40 text-xl absolute" style="top: 5%; left: 45%; animation: twinkle 5s ease-in-out 0.7s infinite;">✦</span>
	<span class="text-secondary/35 text-4xl absolute" style="top: 12%; right: 35%; animation: drift 6s ease-in-out 2s infinite;">★</span>
	<span class="text-secondary/45 text-3xl absolute" style="top: 22%; left: 85%; animation: twinkle 4s ease-in-out 1.5s infinite;">◆</span>
	<span class="text-secondary/35 text-xl absolute" style="top: 32%; right: 45%; animation: twinkle 3.5s ease-in-out 3s infinite;">✦</span>
	<span class="text-secondary/40 text-4xl absolute" style="top: 42%; left: 92%; animation: drift 5.5s ease-in-out infinite;">★</span>
	<span class="text-secondary/35 text-3xl absolute" style="top: 52%; right: 25%; animation: twinkle 6s ease-in-out 0.4s infinite;">✦</span>
	<span class="text-secondary/45 text-xl absolute" style="top: 62%; left: 55%; animation: twinkle 4.5s ease-in-out 2.2s infinite;">◆</span>
	<span class="text-secondary/40 text-xl absolute" style="top: 72%; right: 40%; animation: drift 7s ease-in-out 1s infinite;">★</span>
	<span class="text-secondary/35 text-4xl absolute" style="top: 82%; left: 70%; animation: twinkle 5s ease-in-out 0.9s infinite;">✦</span>
	<span class="text-secondary/45 text-3xl absolute" style="top: 90%; right: 55%; animation: twinkle 3.5s ease-in-out 1.8s infinite;">★</span>
	<!-- Mixed accents deeper in -->
	<span class="text-success-neon/30 text-3xl absolute" style="top: 18%; left: 30%; animation: drift 8s ease-in-out 1s infinite;">★</span>
	<span class="text-secondary/30 text-3xl absolute" style="top: 48%; right: 20%; animation: drift 9s ease-in-out 2s infinite;">✦</span>
	<span class="text-success-neon/35 text-xl absolute" style="top: 58%; left: 25%; animation: twinkle 6s ease-in-out 3.5s infinite;">+</span>
	<span class="text-secondary/35 text-xl absolute" style="top: 38%; left: 60%; animation: twinkle 5s ease-in-out 0.2s infinite;">+</span>
	<span class="text-success-neon/30 text-4xl absolute" style="top: 78%; right: 30%; animation: drift 7s ease-in-out 4s infinite;">◆</span>
	<span class="text-secondary/30 text-4xl absolute" style="top: 95%; left: 40%; animation: twinkle 4.5s ease-in-out 1.3s infinite;">✦</span>
	<!-- Extra yellow trinkets -->
	<span class="text-success-neon/25 text-2xl absolute" style="top: 3%; left: 20%; animation: twinkle 6s ease-in-out 0.3s infinite;">+</span>
	<span class="text-success-neon/30 text-xl absolute" style="top: 10%; left: 75%; animation: drift 5s ease-in-out 1.8s infinite;">✧</span>
	<span class="text-success-neon/20 text-3xl absolute" style="top: 28%; right: 18%; animation: twinkle 7s ease-in-out 0.9s infinite;">✦</span>
	<span class="text-success-neon/35 text-lg absolute" style="top: 40%; left: 40%; animation: drift 6s ease-in-out 2.5s infinite;">★</span>
	<span class="text-success-neon/25 text-2xl absolute" style="top: 50%; right: 35%; animation: twinkle 4s ease-in-out 1.1s infinite;">◇</span>
	<span class="text-success-neon/30 text-xl absolute" style="top: 60%; left: 15%; animation: drift 8s ease-in-out 0.7s infinite;">✧</span>
	<span class="text-success-neon/20 text-3xl absolute" style="top: 70%; right: 22%; animation: twinkle 5s ease-in-out 3.2s infinite;">+</span>
	<span class="text-success-neon/35 text-lg absolute" style="top: 80%; left: 50%; animation: drift 7s ease-in-out 1.4s infinite;">✦</span>
	<span class="text-success-neon/25 text-2xl absolute" style="top: 88%; right: 8%; animation: twinkle 4.5s ease-in-out 2.8s infinite;">★</span>
	<!-- Extra green trinkets -->
	<span class="text-secondary/25 text-2xl absolute" style="top: 6%; right: 28%; animation: drift 5.5s ease-in-out 0.5s infinite;">✧</span>
	<span class="text-secondary/30 text-xl absolute" style="top: 17%; left: 60%; animation: twinkle 6s ease-in-out 2.3s infinite;">+</span>
	<span class="text-secondary/20 text-3xl absolute" style="top: 30%; left: 35%; animation: drift 7s ease-in-out 1.6s infinite;">◇</span>
	<span class="text-secondary/35 text-lg absolute" style="top: 38%; right: 60%; animation: twinkle 4s ease-in-out 0.2s infinite;">✦</span>
	<span class="text-secondary/25 text-2xl absolute" style="top: 47%; left: 80%; animation: drift 8s ease-in-out 3.1s infinite;">★</span>
	<span class="text-secondary/30 text-xl absolute" style="top: 56%; right: 15%; animation: twinkle 5s ease-in-out 1.7s infinite;">✧</span>
	<span class="text-secondary/20 text-3xl absolute" style="top: 68%; left: 42%; animation: drift 6s ease-in-out 0.8s infinite;">+</span>
	<span class="text-secondary/35 text-lg absolute" style="top: 76%; right: 48%; animation: twinkle 7s ease-in-out 2.6s infinite;">◇</span>
	<span class="text-secondary/25 text-2xl absolute" style="top: 84%; left: 28%; animation: drift 4.5s ease-in-out 1.3s infinite;">✦</span>
	<span class="text-secondary/30 text-xl absolute" style="top: 94%; right: 70%; animation: twinkle 5.5s ease-in-out 0.6s infinite;">★</span>
	<!-- Tiny accent dots -->
	<span class="text-success-neon/15 text-xs absolute" style="top: 7%; left: 88%; animation: twinkle 3s ease-in-out 1s infinite;">●</span>
	<span class="text-secondary/15 text-xs absolute" style="top: 20%; right: 5%; animation: twinkle 3.5s ease-in-out 2s infinite;">●</span>
	<span class="text-success-neon/15 text-xs absolute" style="top: 44%; left: 8%; animation: twinkle 4s ease-in-out 0.4s infinite;">●</span>
	<span class="text-secondary/15 text-xs absolute" style="top: 63%; right: 3%; animation: twinkle 3s ease-in-out 1.5s infinite;">●</span>
	<span class="text-success-neon/15 text-xs absolute" style="top: 77%; left: 95%; animation: twinkle 3.5s ease-in-out 2.7s infinite;">●</span>
	<span class="text-secondary/15 text-xs absolute" style="top: 91%; left: 3%; animation: twinkle 4s ease-in-out 0.9s infinite;">●</span>
</div>

<!-- Nav -->
<nav
	class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-background dark:bg-dark-surface-dim border-b-4 border-on-surface dark:border-background"
>
	<div
		class="text-2xl font-headline font-black italic tracking-tighter text-on-surface dark:text-background"
	>
		<a href="{base}/">Wisp</a>
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
		<a
			class="font-label font-bold text-sm {isActive('/submission')
				? 'text-primary underline decoration-4 underline-offset-4'
				: 'text-on-background dark:text-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
			href="{base}/submission">Guidelines</a
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
	class="w-full grid grid-cols-1 md:grid-cols-2 items-center text-center p-4 md:p-8 gap-4 bg-primary dark:bg-on-surface border-t-4 border-on-surface dark:border-background"
>
	<div
		class="font-label font-bold text-sm text-on-primary md:border-r-4 border-on-surface dark:border-background h-full flex items-center justify-center"
	>
		Built by 1Mon for Hack Club 2026
	</div>
	<div class="flex justify-center gap-6 h-full items-center">
		<a
			class="font-label font-bold text-sm text-on-primary hover:bg-on-surface hover:text-surface dark:hover:bg-background dark:hover:text-on-surface transition-colors p-2 rounded-lg"
			href="https://github.com/2Mon/wisp"
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


<style>
	.dot-bg {
		position: fixed;
		inset: -30%;
		z-index: -1;
		opacity: 0.2;
		pointer-events: none;
		background-image: radial-gradient(#344680 1.5px, transparent 1.5px);
		background-size: 28px 28px;
	}

	:global(.dark) .dot-bg {
		background-image: radial-gradient(#E5CFC9 1.5px, transparent 1.5px);
	}
</style>
