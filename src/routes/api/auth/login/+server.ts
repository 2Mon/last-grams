import { redirect } from '@sveltejs/kit';
import { getHCAConfig } from '$lib/admin';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const { clientId, redirectUri } = getHCAConfig();

	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: 'openid email profile'
	});

	redirect(302, `https://auth.hackclub.com/oauth/authorize?${params}`);
};
