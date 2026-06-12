<script lang="ts">
	import { base } from '$app/paths';

	let loggedIn = $state(false);
	let loading = $state(false);
	let subscribers = $state<{ userId: number; email: string; createdAt: string; time: string }[]>([]);

	async function checkSession() {
		loading = true;
		const res = await fetch(`${base}/api/admin/subscribers`);
		if (res.ok) {
			const data = await res.json();
			subscribers = data.subscribers;
			loggedIn = true;
		}
		loading = false;
	}

	async function fetchSubscribers() {
		const res = await fetch(`${base}/api/admin/subscribers`);
		if (res.ok) {
			const data = await res.json();
			subscribers = data.subscribers;
		}
	}

	// Check if already logged in on mount
	$effect(() => {
		checkSession();
	});
</script>

<svelte:head>
	<title>Admin | WISP</title>
</svelte:head>

<main class="max-w-3xl mx-auto px-4 py-12 space-y-8">
	<a
		href="{base}/"
		class="font-headline font-black text-2xl uppercase italic tracking-tighter text-on-surface"
	>
		WISP
	</a>

	{#if loading}
		<div class="text-center py-12">
			<p class="font-body font-bold text-on-surface-variant">Loading...</p>
		</div>
	{:else if !loggedIn}
		<div
			class="border-4 border-on-surface bg-surface-container-lowest hard-shadow p-8 max-w-sm mx-auto space-y-6 text-center"
		>
			<h1 class="font-headline font-black text-3xl uppercase tracking-tighter">Admin</h1>
			<p class="font-body text-on-surface-variant">Sign in with your Hack Club account.</p>
			<a
				href="{base}/api/auth/login"
				class="block w-full bg-primary text-on-primary border-4 border-on-surface px-6 py-3 font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-center"
			>
				Log in with Hack Club
			</a>
		</div>
	{:else}
		<div class="space-y-6">
			<div class="flex items-center justify-between">
				<h1 class="font-headline font-black text-3xl uppercase tracking-tighter">
					Subscribers <span class="text-primary">{subscribers.length}</span>
				</h1>
				<button
					onclick={fetchSubscribers}
					class="bg-surface-container border-4 border-on-surface px-4 py-2 font-label font-bold uppercase text-sm hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
				>
					Refresh
				</button>
			</div>

			<div class="border-4 border-on-surface overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="bg-on-surface text-surface">
							<th
								class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter"
								>User ID</th
							>
							<th
								class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter"
								>Email</th
							>
							<th
								class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter"
								>Date</th
							>
							<th
								class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter"
								>Time</th
							>
						</tr>
					</thead>
					<tbody>
						{#each subscribers as sub}
							<tr class="border-t-2 border-on-surface/20">
								<td class="px-4 py-3 font-headline font-black text-primary">{sub.userId}</td>
								<td class="px-4 py-3 font-body font-bold">{sub.email}</td>
								<td class="px-4 py-3 font-label text-sm text-on-surface-variant">
									{new Date(sub.createdAt).toLocaleDateString()}
								</td>
								<td class="px-4 py-3">
									{sub.time ? new Date(sub.time).toLocaleString() : '—'}
								</td>
							</tr>
						{:else}
							<tr>
								<td
									colspan="4"
									class="px-4 py-8 text-center font-body font-bold text-on-surface-variant"
								>
									No subscribers yet.
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</main>
