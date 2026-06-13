<script lang="ts">
	import { base } from '$app/paths';
	import { inview, tilt } from '$lib';
	import confetti from 'canvas-confetti';
	const gramsUsed = 142; // TODO: make dynamic

	let email = $state('');
	let emailStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let emailError = $state('');

	function fireConfetti() {
		const duration = 2000;
		const end = Date.now() + duration;
		const colors = ['#D44D2C', '#DEAF36', '#389C47', '#344680', '#E5CFC9'];
		(function frame() {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: 0.7 },
				colors
			});
			confetti({
				particleCount: 3,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: 0.7 },
				colors
			});
			if (Date.now() < end) requestAnimationFrame(frame);
		})();
	}

	// Easter egg: Konami code → everything shrinks to 25g size
	let konamiProgress = $state(0);
	let konamiShowBanner = $state(false);
	let konamiBannerText = $state('');
	let partyMode = $state(false);
	let partyEmojis = $state<{ id: number; emoji: string; left: number; delay: number; duration: number }[]>([]);
	let partyIdCounter = 0;
  const partyEmojiPool = [
    '🎉', '🎊', '✨', '🌟', '💫',
    '🎈', '🥳', '🎂', '🧁', '🍰',
    '🍾', '🥂', '🎵', '🎶', '💃',
    '🕺', '🔥', '🌈', '💖', '💎',
    '🪩', '🎁', '🍭', '🍬', '⭐'
  ];
	const konamiCode = [
		'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
		'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
		'b', 'a'
	];

	function spawnPartyEmojis() {
		const batch = Array.from({ length: 15 }, () => ({
			id: partyIdCounter++,
			emoji: partyEmojiPool[Math.floor(Math.random() * partyEmojiPool.length)],
			left: Math.random() * 100,
			delay: Math.random() * 2,
			duration: 2.5 + Math.random() * 2
		}));
		partyEmojis = [...partyEmojis, ...batch];
		setTimeout(() => {
			partyEmojis = partyEmojis.filter((e) => !batch.includes(e));
		}, 5000);
	}

	let partyInterval: ReturnType<typeof setInterval> | null = null;

	function handleKonami(e: KeyboardEvent) {
		if (e.key === konamiCode[konamiProgress]) {
			konamiProgress++;
			if (konamiProgress === konamiCode.length) {
				konamiProgress = 0;
				partyMode = !partyMode;
				if (partyMode) {
					konamiBannerText = 'PARTY MODE ACTIVATED';
					konamiShowBanner = true;
					confetti({ particleCount: 200, spread: 180, origin: { y: 0.4 }, colors: ['#D44D2C', '#DEAF36', '#389C47', '#344680', '#E5CFC9'] });
					spawnPartyEmojis();
					partyInterval = setInterval(spawnPartyEmojis, 3000);
					setTimeout(() => { konamiShowBanner = false; }, 2500);
				} else {
					konamiBannerText = 'Party\'s over... for now';
					konamiShowBanner = true;
					if (partyInterval) { clearInterval(partyInterval); partyInterval = null; }
					partyEmojis = [];
					setTimeout(() => { konamiShowBanner = false; }, 2000);
				}
			}
		} else {
			konamiProgress = e.key === konamiCode[0] ? 1 : 0;
		}
	}

	async function subscribe() {
		if (!email) return;
		emailStatus = 'loading';
		try {
			const res = await fetch(`${base}/api/subscribe`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = await res.json();
			if (res.ok) {
				emailStatus = 'success';
				email = '';
				fireConfetti();
			} else {
				emailStatus = 'error';
				emailError = data.error || 'Something went wrong.';
			}
		} catch {
			emailStatus = 'error';
			emailError = 'Network error. Try again.';
		}
	}

	const projects = [
		{
			user: 'Clement',
			name: 'Your Color Change Buddy',
			weight: '4.20g',
			rotate: '-1deg',
			img: 'https://media.printables.com/media/prints/204388/images/1886602_65b50415-f71b-4420-88d8-20ee4afd71ad/thumbs/inside/640x480/jpg/color-change-buddy4.webp'
		},
		{
			user: 'FishboneWorkshop',
			name: 'Cable labels',
			weight: '8.15g',
			rotate: '2deg',
			img: 'https://media.printables.com/media/prints/207466/images/1907670_0741c15a-73a4-404d-8d11-b953692b5bdf/thumbs/inside/640x480/png/zawieszkanakable.webp'
		},
		{
			user: 'ThorinOakenshield',
			name: 'Cyclo valve cover',
			weight: '2.45g',
			rotate: '-2deg',
			img: 'https://media.printables.com/media/prints/208673/images/1916044_8f1cf666-a118-4a49-b79e-9e2408b1ecac/thumbs/inside/640x480/jpg/dscn1037.webp'
		},
		{
			user: 'XavierFaraudo',
			name: 'Book-style SD card case',
			weight: '0.95g',
			rotate: '1deg',
			img: 'https://media.printables.com/media/prints/210458/images/1936578_3da808f8-3072-4946-88c6-efbc3e89be7d/thumbs/inside/640x480/jpg/1-portada-amb-marques.webp'
		},
		{
			user: 'XavierFaraudo',
			name: 'Remaining filament scales',
			weight: '12.3g',
			rotate: '-1deg',
			img: 'https://media.printables.com/media/prints/205435/images/2590817_eca96780-9b60-412d-989a-67d2d8916eef/thumbs/inside/1600x1200/jpg/1-portada-medodors.webp'
		},
		{
			user: '3DPrinty',
			name: 'Itty Bitty Fidget',
			weight: '6.77g',
			rotate: '2deg',
			img: 'https://storage.googleapis.com/production-thangs-public/uploads/attachments/f43800bd-7954-4926-9f80-a20f142ce988/square-thumbnail-1.jpg'
		},
		{
			user: 'Saccy',
			name: 'Reusable Flossholder',
			weight: '18.9g',
			rotate: '-2deg',
			img: 'https://media.printables.com/media/prints/205005/images/1884641_904530a3-fabc-495b-8687-226b9b4389de/thumbs/inside/1600x1200/jpg/280533793_1934515593604035_2533210206350668186_n.webp'
		}
	];
</script>

<svelte:head>
	<title>Wisp — A Hack Club YSWS</title>
	<meta name="description" content="Design and 3D-print something under 25 grams. Ship it, earn rewards. A Hack Club You Ship We Ship project." />
</svelte:head>

<svelte:window onkeydown={handleKonami} />

{#if konamiShowBanner}
	<div class="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
		<div class="px-8 py-6 text-center border-4 pointer-events-auto bg-on-surface dark:bg-dark-container text-surface dark:text-background border-primary dark:border-primary-container hard-shadow rounded-2xl" style="animation: fade-in-up 0.3s ease-out forwards;">
			<p class="text-3xl font-black tracking-tighter font-headline text-primary">{konamiBannerText}</p>
			<p class="mt-3 text-xs uppercase font-label text-surface/50">{partyMode ? '↑↑↓↓←→←→BA to stop' : ''}</p>
		</div>
	</div>
{/if}

{#if partyMode}
	<div class="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
		{#each partyEmojis as e (e.id)}
			<span
				class="absolute text-4xl party-emoji-fall"
				style="left: {e.left}%; animation-delay: {e.delay}s; animation-duration: {e.duration}s;"
			>{e.emoji}</span>
		{/each}
	</div>
{/if}


<div class:party-wiggle={partyMode} class:party-hue={partyMode} >

<main class="px-4 py-12 mx-auto space-y-16 max-w-7xl sm:px-6 lg:px-8">
	<!-- Hero -->
	<section class="flex flex-col items-center py-12 space-y-8 text-center">
		<div class="space-y-4">
			<h1
				use:inview
				class="text-5xl font-black leading-none tracking-tighter animate-in gentle-float font-headline sm:text-7xl md:text-9xl text-on-surface dark:text-background" 
			>
				wisp
			</h1>
			<p
				use:inview
				class="max-w-lg mx-auto text-xl font-bold leading-snug animate-in stagger-1 font-body md:text-2xl text-on-surface dark:text-background"
			>
				Design something small and creative — a 3D print under 25g, a tiny PCB, a
				pocket-sized gadget. We'll cover your materials and send you some cool rewards.
			</p>
		</div>

		<div use:inview class="flex flex-col items-center gap-4 animate-in stagger-2 md:flex-row">
			<a
				class="bg-primary text-on-primary border-4 border-on-surface px-10 py-5 text-2xl font-headline font-black tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-xl"
				href="{base}/submission">Read the Guidelines</a
			>
			<a
				class="text-sm font-bold underline transition-colors font-label text-on-surface dark:text-background decoration-2 underline-offset-4 hover:text-primary"
				href="https://forms.hackclub.com"
				target="_blank" rel="noopener noreferrer">Submit a Project →</a
			>
		</div>

		<!-- Email signup -->
		<div class="w-full max-w-md h-[58px] relative">
			{#if emailStatus === 'success'}
				<div class="absolute inset-0 flex items-center justify-center">
					<p class="text-sm font-bold text-center uppercase font-label text-primary">We'll be in touch!</p>
				</div>
			{:else}
				<form
					onsubmit={(e) => { e.preventDefault(); subscribe(); }}
					class="flex h-full gap-0"
				>
					<input
						type="email"
						placeholder="your@email.com"
						bind:value={email}
						required
						class="flex-grow px-4 py-3 text-lg font-bold border-4 border-r-0 border-on-surface font-body bg-surface-container-lowest dark:bg-dark-container dark:text-background dark:border-background text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none "
					/>
					<button
						type="submit"
						disabled={emailStatus === 'loading'}
						class="bg-primary text-on-primary border-4 border-on-surface dark:border-background px-6 py-3 font-headline font-black tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 whitespace-nowrap "
					>
						{emailStatus === 'loading' ? '...' : 'Notify Me'}
					</button>
				</form>
				{#if emailStatus === 'error'}
					<p class="mt-2 text-xs font-bold font-label text-primary">{emailError}</p>
				{/if}
			{/if}
		</div>

		<div
			class="flex items-center gap-3 px-4 py-3 border-4 rounded-full bg-surface-container dark:bg-dark-container border-on-surface dark:border-background hard-shadow"
		>
			<span
				class="text-3xl material-symbols-outlined text-primary animate-wiggle" role="img" aria-label="Scale icon"
				style="font-variation-settings: 'FILL' 1;">scale</span
			>
			<p
				class="text-2xl font-black leading-none font-headline text-on-surface dark:text-background"
			>
				{gramsUsed}g Shipped
			</p>
		</div>
	</section>

	<!-- Marquee -->
	<section class="relative space-y-8" style="width: 100vw; margin-left: calc(-50vw + 50%);">
		<div class="flex items-center gap-4 px-4 mx-auto max-w-7xl">
			<h2
				class="relative text-3xl font-black tracking-tighter font-headline shrink-0 text-on-surface dark:text-background"
			>				What People Have Made			</h2>
			<div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
		</div>

		<div
			class="relative w-full"
			style="overflow-x: hidden; mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);"
		>
			<div
				class="flex gap-6 animate-marquee-slow hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing py-4"
				style="width: max-content"
			>
				<!-- Original set -->
				<div class="flex gap-6">
					{#each projects as p}
						<div
							use:tilt
							class="inline-block bg-surface-container-lowest dark:bg-dark-container border-4 border-on-surface dark:border-background p-3 hard-shadow min-w-[280px] rounded-xl"
							style="transform: rotate({p.rotate})"
						>
							<img
								alt={p.name}
								class="object-cover w-full h-40 mb-3 border-2 rounded-lg border-on-surface dark:border-background"
								src={p.img}
								loading="lazy"
							/>
							<div class="flex items-end justify-between">
								<div>
									<p class="font-label text-[10px] uppercase font-bold text-primary">
										By @{p.user}
									</p>
									<h4
										class="text-xl font-black leading-tight font-headline text-on-surface dark:text-background"
									>
										{p.name}
									</h4>
								</div>
								<div
									class="px-2 py-1 text-sm font-bold rounded-full bg-on-surface dark:bg-background text-surface dark:text-on-surface font-label"
								>
									{p.weight}
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Duplicate set for seamless loop -->
				<div class="flex gap-6" aria-hidden="true">
					{#each projects as p}
						<div
							use:tilt
							class="inline-block bg-surface-container-lowest dark:bg-dark-container border-4 border-on-surface dark:border-background p-3 hard-shadow min-w-[280px] rounded-xl"
							style="transform: rotate({p.rotate})"
						>
							<img
								alt={p.name}
								class="object-cover w-full h-40 mb-3 border-2 rounded-lg border-on-surface dark:border-background"
								src={p.img}
								loading="lazy"
							/>
							<div class="flex items-end justify-between">
								<div>
									<p class="font-label text-[10px] uppercase font-bold text-primary">
										By @{p.user}
									</p>
									<h4
										class="text-xl font-black leading-tight font-headline text-on-surface dark:text-background"
									>
										{p.name}
									</h4>
								</div>
								<div
									class="px-2 py-1 text-sm font-bold rounded-full bg-on-surface dark:bg-background text-surface dark:text-on-surface font-label"
								>
									{p.weight}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- SpecBanner -->
	<section
		class="relative w-full py-6 bg-on-surface text-surface border-y-4 border-primary"
		style="width: 100vw; margin-left: calc(-50vw + 50%); overflow-x: hidden; mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);"
	>
		<div
			class="flex text-4xl italic font-black tracking-tighter animate-marquee font-headline md:text-5xl"
			style="width: max-content; white-space: nowrap; gap: 3rem;"
		>
			<span>Design Build Share Repeat </span>
			<span>Design Build Share Repeat </span>
			<span aria-hidden="true">Design Build Share Repeat </span>
			<span aria-hidden="true">Design Build Share Repeat </span>
		</div>
	</section>

	<!-- Prizes -->
	<section class="space-y-12">
		<div class="max-w-2xl text-center md:text-left">
			<h2
				class="mb-4 text-5xl font-black leading-none tracking-tighter font-headline text-on-surface dark:text-background"
			>
				Rewards
			</h2>
			<p class="text-xl font-bold font-body text-on-surface dark:text-background">
				We'll cover your <span class="highlight-yellow">build costs</span> and send you bonus rewards when your project is approved.
			</p>
		</div>
		<div class="relative grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
			<!-- Scattered sparkles -->			<!-- Tier 1: 1 Ship -->
			<div
				use:inview
				use:tilt
				class="relative flex flex-col p-0 overflow-hidden border-4 animate-in stagger-1 hover-lift bg-surface-container-lowest dark:bg-dark-container border-on-surface dark:border-background hard-shadow rounded-xl"
			>
				<div
					class="px-4 py-2 text-2xl italic font-black tracking-tighter bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
				>
					1 Approved Ship
				</div>
				<div class="flex-1 p-6 space-y-4">
					<div>
						<h3
							class="text-3xl font-black leading-none font-headline text-on-surface dark:text-background"
						>
							Sticker Pack
						</h3>
						<p
							class="mt-2 text-lg font-bold font-body text-on-surface dark:text-background opacity-80"
						>
							Custom Wisp stickers for your projects.
						</p>
					</div>
				</div>
				<div
					class="p-4 border-t-4 border-on-surface dark:border-background bg-surface-container dark:bg-dark-container"
				>
					<p class="text-xs font-bold uppercase font-label text-primary">Tier 1</p>
				</div>
			</div>

			<!-- Tier 2: 2 Ships -->
			<div
				use:inview
				use:tilt
				class="relative flex flex-col p-0 overflow-hidden border-4 animate-in stagger-2 hover-lift bg-primary-container border-on-surface dark:border-background hard-shadow rounded-xl"
			>
				<div
					class="px-4 py-2 text-2xl italic font-black tracking-tighter bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
				>
					2 Approved Ships
				</div>
				<div class="flex-1 p-6 space-y-4">
					<div>
						<h3
							class="text-3xl font-black leading-none font-headline text-on-primary-container"
						>
							1kg Hack Club Filament
						</h3>
						<p class="mt-2 text-lg font-bold font-body text-on-primary-container">
							Custom Hack Club spool. Red PLA with white glitter.
						</p>
					</div>
				</div>
				<div
					class="p-4 border-t-4 border-on-surface dark:border-background bg-on-primary-container/10"
				>
					<p class="text-xs font-bold uppercase font-label text-on-primary-container">
						Tier 2
					</p>
				</div>
			</div>

			<!-- Tier 3: 4 Ships -->
			<div
				use:inview
				use:tilt
				class="relative flex flex-col p-0 overflow-hidden border-4 animate-in stagger-3 hover-lift bg-surface-container-lowest dark:bg-dark-container border-on-surface dark:border-background hard-shadow rounded-xl"
			>
				<div
					class="px-4 py-2 text-2xl italic font-black tracking-tighter bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
				>
					4 Approved Ships
				</div>
				<div class="flex-1 p-6 space-y-4">
					<div>
						<h3
							class="text-3xl font-black leading-none font-headline text-on-surface dark:text-background"
						>
							Hack Club Shirt
						</h3>
						<p
							class="mt-2 text-lg font-bold font-body text-on-surface dark:text-background opacity-80"
						>
							An exclusive Hack Club t-shirt to rep your builds.
						</p>
					</div>
				</div>
				<div
					class="p-4 border-t-4 border-on-surface dark:border-background bg-surface-container dark:bg-dark-container"
				>
					<p class="text-xs font-bold uppercase font-label text-primary">Tier 3</p>
				</div>
			</div>
		</div>
	</section>

	<!-- How it works -->
	<section class="space-y-12">
		<div class="flex items-center gap-4">
			<div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
			<h2
				class="relative text-4xl font-black tracking-tighter font-headline shrink-0 text-on-surface dark:text-background"
			>				How It Works
			</h2>
			<div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div
				use:inview
				class="relative p-8 border-4 animate-in stagger-1 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow"
			>
				<span
					class="absolute flex items-center justify-center w-12 h-12 text-2xl font-black rounded-full -top-4 -left-4 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
					>01</span
				>
				<h4
					class="mt-4 text-xl font-black font-headline text-on-surface dark:text-background"
				>
					Design Your Project
				</h4>
				<p class="mt-4 text-lg font-bold font-body text-on-surface-variant dark:text-background/70">
					For prints, keep it <span class="highlight-yellow">under 25g</span>. For hardware, go as small as you can with your idea.
				</p>
			</div>
			<div
				use:inview
				class="relative p-8 border-4 animate-in stagger-2 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow"
			>
				<span
					class="absolute flex items-center justify-center w-12 h-12 text-2xl font-black rounded-full -top-4 -left-4 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
					>02</span
				>
				<h4
					class="mt-4 text-xl font-black font-headline text-on-surface dark:text-background"
				>
					Document Your Work
				</h4>
				<p class="mt-4 text-lg font-bold font-body text-on-surface-variant dark:text-background/70">
					Write a <span class="highlight-green">JOURNAL.md</span> in your GitHub repo documenting your process.
				</p>
			</div>
			<div
				use:inview
				class="relative p-8 border-4 animate-in stagger-3 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow"
			>
				<span
					class="absolute flex items-center justify-center w-12 h-12 text-2xl font-black rounded-full -top-4 -left-4 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
					>03</span
				>
				<h4
					class="mt-4 text-xl font-black font-headline text-on-surface dark:text-background"
				>
					Build It
				</h4>
				<p class="mt-4 text-lg font-bold font-body text-on-surface-variant dark:text-background/70">
					Print, solder, or assemble — whatever your project needs. Don't have a printer? Check out #printing-legion on Slack.
				</p>
			</div>
			<div
				use:inview
				class="relative p-8 border-4 animate-in stagger-4 border-on-surface dark:border-background bg-primary text-on-primary hard-shadow-primary"
			>
				<span
					class="absolute flex items-center justify-center w-12 h-12 text-2xl font-black rounded-full -top-4 -left-4 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline"
					>04</span
				>
				<h4 class="mt-4 text-xl font-black font-headline">Ship Your Project</h4>
				<p class="mt-4 text-lg font-bold font-body">
					Submit your project for review. Once it's approved, we'll send your <span class="highlight-yellow">rewards</span>!
				</p>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section id="faq" class="space-y-6">
		<div class="flex items-center gap-4">
			<div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
			<h2
				class="relative text-4xl font-black tracking-tighter font-headline shrink-0 text-on-surface dark:text-background"
			>				FAQ			</h2>
			<div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> Is This Real?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					Yes. <a href="https://hackclub.com" class="underline text-primary" target="_blank" rel="noopener noreferrer">Hack Club</a> is
					a registered <span class="highlight-green">501(c)(3) nonprofit</span> with 50,000+ teen members worldwide, backed by
					GitHub founder Tom Preston-Werner, Dell founder Michael Dell, and others.
					All programs are <span class="highlight-yellow">completely free</span>. We've shipped
					<a href="https://infill.hackclub.com" class="underline text-primary" target="_blank" rel="noopener noreferrer">Infill</a>,
					<a href="https://highway.hackclub.com" class="underline text-primary" target="_blank" rel="noopener noreferrer">Highway</a>,
					<a href="https://blueprint.hackclub.com" class="underline text-primary" target="_blank" rel="noopener noreferrer">Blueprint</a>,
					<a href="https://stasis.hackclub.com" class="underline text-primary" target="_blank" rel="noopener noreferrer">Stasis</a>,
					and more.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> What Is Wisp?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					Wisp is a Hack Club (You Ship, We Ship) program. Build an <span class="highlight-green">original project
					under 25g</span>, or a miniature hardware project. We'll send you <span class="highlight-yellow">real prizes</span>.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> Who Can Participate?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					<span class="highlight-green">Teens aged 13–18</span> of all experience levels can participate in Wisp! Guided projects
					are available.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> Does My Design Have to Be Original?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					Yes — everything you submit should be your own <span class="highlight-yellow">original work</span>.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> How Do I Prove My Weight?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					For 3D prints, submit a slicer screenshot or a photo on a scale. For PCBs and other
					hardware, photo on a scale showing the weight.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> What Materials Are Allowed?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					For prints: PLA, ABS, PETG, TPU, Nylon, resin, all <span class="highlight-yellow">under 25g</span>. For hardware:
					PCBs, components, enclosures. Just keep the whole thing small and compact.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> Can I Submit More Than Once?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					Yes! Every unique original design is a new ship. At <span class="highlight-green">2 approved ships</span> you unlock custom
					Hack Club filament, and at <span class="highlight-yellow">4</span> you get an exclusive Hack Club shirt.
				</p>
			</div>
		</div>

		<div
			use:inview
			class="p-8 border-4 animate-in border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container rounded-xl"
		>
			<h3
				class="flex gap-4 text-2xl font-black font-headline text-on-surface dark:text-background"
			>
				<span class="text-primary">Q:</span> Have a Question?
			</h3>
			<div class="pl-10 mt-4 border-l-4 border-primary">
				<p class="text-xl font-bold font-body text-on-surface dark:text-background">
					Come say hi in <span class="font-black text-primary">#wisp</span> on the Hack Club Slack.
				</p>
			</div>
		</div>
	</section>

	<!-- Call to Action -->
	<section
		class="relative p-8 overflow-hidden text-center border-4 md:p-20 border-on-surface dark:border-background"
	>
		<!-- Background -->
		<div class="absolute inset-0 bg-on-surface dark:bg-background"></div>

		<!-- Grid paper effect -->
		<div
			class="absolute inset-0 opacity-[0.04]"
			style="background-image:
				linear-gradient(rgba(229,207,201,1) 1px, transparent 1px),
				linear-gradient(90deg, rgba(229,207,201,1) 1px, transparent 1px);
			background-size: 24px 24px;"
		></div>

		<!-- Scattered tiny shapes (CSS-only, no emojis) -->
		<div class="absolute top-8 left-[10%] w-3 h-3 border-2 border-surface/15 dark:border-on-surface/15 rounded-full animate-[spin_12s_linear_infinite]"></div>
		<div class="absolute top-16 right-[15%] w-4 h-4 border-2 border-primary/20 rotate-45"></div>
		<div class="absolute bottom-12 left-[20%] w-2 h-2 bg-success-neon/20 rounded-full"></div>
		<div class="absolute bottom-20 right-[12%] w-3 h-3 border-2 border-success-neon/15 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
		<div class="absolute top-1/3 left-[5%] w-5 h-[2px] bg-primary/15 rotate-[-30deg]"></div>
		<div class="absolute top-1/4 right-[8%] w-5 h-[2px] bg-success-neon/15 rotate-[20deg]"></div>
		<div class="absolute bottom-1/3 left-[8%] w-2 h-2 border-2 border-surface/10 dark:border-on-surface/10 rotate-12"></div>
		<div class="absolute top-12 left-[40%] w-2 h-2 bg-primary/10 rotate-45"></div>
		<div class="absolute bottom-8 right-[35%] w-[6px] h-[6px] border-2 border-success-neon/10 rounded-full"></div>

		<!-- Floating weight whispers -->
		<div class="absolute top-6 left-8 font-label text-[10px] text-surface/15 dark:text-on-surface/15 rotate-[-12deg] select-none" style="animation: float-scale 4s ease-in-out infinite;">0.3g</div>
		<div class="absolute top-14 right-12 font-label text-xs text-surface/10 dark:text-on-surface/10 rotate-[8deg] select-none" style="animation: float-scale 5s ease-in-out 1s infinite;">7g</div>
		<div class="absolute bottom-12 left-16 font-label text-[10px] text-surface/8 dark:text-on-surface/8 rotate-[15deg] select-none" style="animation: float-scale 6s ease-in-out 2s infinite;">24.9g</div>
		<div class="absolute bottom-10 right-10 font-label text-xs text-surface/15 dark:text-on-surface/15 rotate-[-6deg] select-none" style="animation: float-scale 4.5s ease-in-out 0.5s infinite;">1.2g</div>
		<div class="absolute top-1/2 left-6 font-label text-[10px] text-surface/8 dark:text-on-surface/8 rotate-[-20deg] select-none" style="animation: float-scale 5.5s ease-in-out 3s infinite;">18g</div>
		<div class="absolute top-1/3 right-6 font-label text-[11px] text-surface/10 dark:text-on-surface/10 rotate-[25deg] select-none" style="animation: float-scale 7s ease-in-out 1.5s infinite;">4.7g</div>

		<div class="relative z-10 space-y-8">
			<p class="font-label font-bold text-sm tracking-[0.25em] uppercase text-surface/40 dark:text-on-surface/40">
				Under 25 grams. Unlimited potential.
			</p>
			<h2 class="font-headline font-black text-5xl md:text-7xl lg:text-[8rem] text-surface dark:text-on-surface leading-[0.8] tracking-tighter">
				What will<br/>
				<span class="inline-block" style="animation: gentle-float 3s ease-in-out infinite;">you</span>
				make?
			</h2>
			<div class="flex items-center justify-center gap-3">
				<div class="w-8 h-[3px] bg-primary rounded-full"></div>
				<div class="w-3 h-[3px] bg-success-neon rounded-full"></div>
				<div class="w-1.5 h-[3px] bg-success-neon/50 rounded-full"></div>
			</div>
			<div class="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row">
				<a
					href="{base}/submission"
					class="group relative bg-primary text-white border-4 border-surface dark:border-background px-12 py-5 text-xl font-headline font-black tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all inline-block overflow-hidden"
				>
					<span class="relative z-10">
						Start Building
						<span class="inline-block transition-transform group-hover:translate-x-2 group-hover:scale-110">→</span>
					</span>
				</a>
				<span class="hidden font-label text-surface/30 dark:text-on-surface/30 sm:block">or</span>
				<a
					href="https://forms.hackclub.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm font-bold underline transition-all font-label text-surface/60 dark:text-on-surface/60 decoration-2 decoration-primary/40 underline-offset-4 hover:text-primary hover:decoration-primary"
				>
					Submit a Project
				</a>
			</div>
		</div>
	</section>
</main>
</div>
