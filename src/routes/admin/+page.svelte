<script lang="ts">
	import { base } from '$app/paths';

	let username = $state('');
	let password = $state('');
	let loginError = $state('');
	let loggedIn = $state(false);
	let loading = $state(false);
	let subscribers = $state<{ number: number; email: string; createdAt: string }[]>([]);

	async function login() {
		loginError = '';
		loading = true;
		try {
			const res = await fetch(`${base}/api/admin/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			const data = await res.json();
			if (res.ok) {
				loggedIn = true;
				await fetchSubscribers();
			} else {
				loginError = data.error || 'Login failed.';
			}
		} catch {
			loginError = 'Network error.';
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
</script>

<svelte:head>
	<title>Admin | LAST GRAMS</title>
</svelte:head>

<main class="max-w-3xl mx-auto px-4 py-12 space-y-8">
	<a href="{base}/" class="font-headline font-black text-2xl uppercase italic tracking-tighter text-on-surface">
		LAST GRAMS
	</a>

	{#if !loggedIn}
		<div class="border-4 border-on-surface bg-surface-container-lowest hard-shadow p-8 max-w-sm mx-auto space-y-6">
			<h1 class="font-headline font-black text-3xl uppercase tracking-tighter">Admin</h1>
			<form
				onsubmit={(e) => { e.preventDefault(); login(); }}
				class="space-y-4"
			>
				<input
					type="text"
					placeholder="Username"
					bind:value={username}
					required
					class="w-full border-4 border-on-surface px-4 py-3 font-body font-bold text-lg bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
				/>
				<input
					type="password"
					placeholder="Password"
					bind:value={password}
					required
					class="w-full border-4 border-on-surface px-4 py-3 font-body font-bold text-lg bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
				/>
				{#if loginError}
					<p class="font-label font-bold text-sm text-primary">{loginError}</p>
				{/if}
				<button
					type="submit"
					disabled={loading}
					class="w-full bg-primary text-on-primary border-4 border-on-surface px-6 py-3 font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
				>
					{loading ? '...' : 'Log In'}
				</button>
			</form>
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
							<th class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter">#</th>
							<th class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter">Email</th>
							<th class="px-4 py-3 text-left font-headline font-black uppercase text-sm tracking-tighter">Date</th>
						</tr>
					</thead>
					<tbody>
						{#each subscribers as sub}
							<tr class="border-t-2 border-on-surface/20">
								<td class="px-4 py-3 font-headline font-black text-primary">{sub.number}</td>
								<td class="px-4 py-3 font-body font-bold">{sub.email}</td>
								<td class="px-4 py-3 font-label text-sm text-on-surface-variant">
									{new Date(sub.createdAt).toLocaleDateString()}
								</td>
							</tr>
						{:else}
							<tr>
								<td colspan="3" class="px-4 py-8 text-center font-body font-bold text-on-surface-variant">
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
