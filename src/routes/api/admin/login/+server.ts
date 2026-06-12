import { json } from '@sveltejs/kit';
import { getAdminCredentials, setSession } from '$lib/admin';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();

	const creds = getAdminCredentials();

	if (username !== creds.username || password !== creds.password) {
		return json({ error: 'Invalid credentials.' }, { status: 401 });
	}

	setSession(cookies);
	return json({ success: true });
};
