import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

const SESSION_COOKIE = 'admin_session';

export function getSessionToken(): string {
	return env.ADMIN_SESSION_SECRET || 'wisp-secret';
}

export function isValidSession(cookies: Cookies): boolean {
	return cookies.get(SESSION_COOKIE) === getSessionToken();
}

export function setSession(cookies: Cookies): void {
	cookies.set(SESSION_COOKIE, getSessionToken(), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});
}

export function clearSession(cookies: Cookies): void {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function getHCAConfig() {
	return {
		clientId: env.HCA_CLIENT_ID || '',
		clientSecret: env.HCA_CLIENT_SECRET || '',
		redirectUri: env.HCA_REDIRECT_URI || 'https://rxs0o9.k.hackclub.dev/api/auth/callback'
	};
}
