import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'Invalid email address.' }, { status: 400 });
	}

	const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = env;

	if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
		console.error('Missing Airtable environment variables');
		return json({ error: 'Server misconfigured.' }, { status: 500 });
	}

	const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${AIRTABLE_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			records: [{ fields: { Email: email } }]
		})
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('Airtable error:', res.status, text);
		return json({ error: 'Failed to subscribe. Try again later.' }, { status: 502 });
	}

	return json({ success: true });
};
