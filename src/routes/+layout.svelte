<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { toastMessage } from '$lib';
	import { backOut, cubicIn } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	function popIn(_node: HTMLElement, { duration = 500 } = {}) {
		return {
			duration,
			easing: backOut,
			css: (t: number) =>
				`transform: translateY(${(1 - t) * 40}px) scale(${0.7 + t * 0.3}); opacity: ${t};`
		};
	}

	function shootUp(_node: HTMLElement, { duration = 550 } = {}) {
		const dist = typeof window !== 'undefined' ? window.innerHeight + 100 : 900;
		return {
			duration,
			easing: cubicIn,
			css: (t: number, u: number) =>
				`transform: translateY(${-u * dist}px) scale(${0.5 + t * 0.5}); opacity: ${t};`
		};
	}

	let { children } = $props();
	let sparkleField: HTMLDivElement;
	let darkMode = $state(false);
	let reduceMotion = $state(false);
	let menuOpen = $state(false);

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

		const storedMotion = localStorage.getItem('reduceMotion');
		if (storedMotion !== null) {
			reduceMotion = storedMotion === 'true';
		} else {
			reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}

		const handleScroll = (): void => {
			if (sparkleField) sparkleField.style.transform = `translateY(${window.scrollY * -0.15}px)`;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return (): void => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		localStorage.setItem('darkMode', String(darkMode));
	});

	$effect(() => {
		localStorage.setItem('reduceMotion', String(reduceMotion));
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</svelte:head>

<div class="isolate {darkMode ? 'dark' : ''} {reduceMotion ? 'reduce-motion' : ''} min-h-screen bg-background dark:bg-dark-surface-dim">
<div class="dot-bg"></div>

<!-- Hack Club flag -->
<a
	href="https://hackclub.com/"
	target="_blank"
	rel="noopener noreferrer"
	class="fixed top-24 left-0 z-[60] transition-transform hover:translate-x-1 {menuOpen ? 'hidden' : ''}"
	aria-label="Hack Club"
>
	<img
		src="https://assets.hackclub.com/flag-orpheus-left.svg"
		alt="Hack Club"
		class="w-24 md:w-32 drop-shadow-md"
	/>
</a>

<div bind:this={sparkleField} class="fixed inset-0 pointer-events-none select-none overflow-hidden" style="z-index: -1; will-change: transform;" aria-hidden="true">
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
	class="sticky top-0 z-50 relative flex justify-between items-center px-6 py-4 bg-background dark:bg-dark-surface-dim border-b-4 border-on-surface dark:border-background"
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
			onclick={() => (reduceMotion = !reduceMotion)}
			class="w-10 h-10 flex items-center justify-center border-4 border-on-surface dark:border-background text-on-surface dark:text-background hover:bg-surface-container dark:hover:bg-dark-container-high transition-colors rounded-lg"
			aria-label="Reduce animations"
			aria-pressed={reduceMotion}
			title={reduceMotion ? 'Animations off' : 'Reduce animations'}
		>
			<span class="material-symbols-outlined text-lg">
				{reduceMotion ? 'motion_photos_off' : 'motion_photos_on'}
			</span>
		</button>
		<button
			onclick={() => (darkMode = !darkMode)}
			class="w-10 h-10 flex items-center justify-center border-4 border-on-surface dark:border-background text-on-surface dark:text-background hover:bg-surface-container dark:hover:bg-dark-container-high transition-colors rounded-lg"
			aria-label="Toggle dark mode"
		>
			<span class="material-symbols-outlined text-xl">
				{darkMode ? 'light_mode' : 'dark_mode'}
			</span>
		</button>
		<a
			class="hidden sm:inline-block bg-primary text-on-primary border-4 border-on-surface dark:border-background px-6 py-2 font-headline font-black tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-lg"
			href="{base}/submission"
		>
			Submit
		</a>
		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="md:hidden w-10 h-10 flex items-center justify-center border-4 border-on-surface dark:border-background text-on-surface dark:text-background hover:bg-surface-container dark:hover:bg-dark-container-high transition-colors rounded-lg"
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
		>
			<span class="material-symbols-outlined text-xl">
				{menuOpen ? 'close' : 'menu'}
			</span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div
			transition:slide
			class="md:hidden absolute top-full left-0 right-0 flex flex-col bg-background dark:bg-dark-surface-dim border-b-4 border-on-surface dark:border-background"
		>
			{#each [{ path: '/', label: 'Home' }, { path: '/gallery', label: 'Gallery' }, { path: '/submission', label: 'Guidelines' }] as link}
				<a
					href="{base}{link.path}"
					onclick={() => (menuOpen = false)}
					class="px-6 py-4 font-label font-bold text-base border-t-4 border-on-surface/10 dark:border-background/10 {isActive(link.path)
						? 'text-primary bg-surface-container dark:bg-dark-container'
						: 'text-on-background dark:text-background'} hover:bg-surface-container dark:hover:bg-dark-container-high transition-colors"
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

{@render children()}

<!-- Toast -->
{#if $toastMessage}
	<div class="fixed bottom-6 left-0 right-0 z-[70] flex justify-center px-4 pointer-events-none">
		<div in:popIn out:shootUp>
			<div
				class="toast-rock bg-surface-container-lowest dark:bg-dark-container text-on-surface dark:text-background font-headline font-black tracking-tight px-5 py-4 border-4 border-on-surface dark:border-background hard-shadow rounded-2xl max-w-[90vw] text-center"
				role="status"
			>
				{$toastMessage}
			</div>
		</div>
	</div>
{/if}

<!-- Footer -->
<footer
	class="w-full bg-primary dark:bg-on-surface border-t-4 border-on-surface dark:border-background"
>
	<div class="grid grid-cols-1 md:grid-cols-2 items-center text-center p-4 md:p-8 gap-4">
		<div
			class="font-label font-bold text-sm text-on-primary md:border-r-4 border-on-surface dark:border-background h-full flex flex-wrap items-center justify-center gap-3"
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
	</div>
</footer>
</div>


<style>
	.dot-bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		opacity: 0.2;
		pointer-events: none;
		background-image: radial-gradient(#344680 1.5px, transparent 1.5px);
		background-size: 28px 28px;
		transition: opacity 0.3s ease-in-out;
	}

	:global(.dark) .dot-bg {
		background-image: radial-gradient(#E5CFC9 1.5px, transparent 1.5px);
	}
</style>
