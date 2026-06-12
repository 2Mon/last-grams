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
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});
}

export function getAdminCredentials() {
	return {
		username: env.ADMIN_USERNAME || 'admin',
		password: env.ADMIN_PASSWORD || 'lastgrams2026'
	};
}
