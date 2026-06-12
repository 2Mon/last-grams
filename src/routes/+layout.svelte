<script lang="ts">
	import { onMount } from 'svelte';
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let dotBg: HTMLDivElement;

	onMount((): (() => void) => {
		const handleScroll = (): void => {
			dotBg.style.transform = `translateY(${window.scrollY * -0.3}px)`;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return (): void => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</svelte:head>

<div class="dot-bg" bind:this={dotBg}></div>

{@render children()}


<style>
	.dot-bg {
		position: fixed;
		inset: -50%;
		z-index: -1;
		opacity: 0.2;
		pointer-events: none;
		background-image: radial-gradient(#2e2f2d 1.5px, transparent 1.5px);
		background-size: 28px 28px;
	}
</style>
