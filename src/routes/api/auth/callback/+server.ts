import { redirect, error } from '@sveltejs/kit';
import { getHCAConfig, setSession } from '$lib/admin';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		error(400, 'Missing authorization code');
	}

	const { clientId, clientSecret, redirectUri } = getHCAConfig();

	// Exchange code for token
	const tokenRes = await fetch('https://auth.hackclub.com/oauth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		})
	});

	if (!tokenRes.ok) {
		console.error('HCA token exchange failed:', tokenRes.status, await tokenRes.text());
		error(401, 'Authentication failed');
	}

	const tokenData = await tokenRes.json();
	const accessToken = tokenData.access_token;

	// Fetch user info
	const userRes = await fetch('https://auth.hackclub.com/api/v1/me', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	if (!userRes.ok) {
		console.error('HCA user fetch failed:', userRes.status, await userRes.text());
		error(401, 'Failed to fetch user info');
	}

	const user = await userRes.json();
	console.log('HCA login:', user.email || user.id);

	// Set session cookie
	setSession(cookies);

	redirect(302, '/admin/');
};
