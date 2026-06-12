import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { isValidSession } from '$lib/admin';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	if (!isValidSession(cookies)) {
		return json({ error: 'Unauthorized.' }, { status: 401 });
	}

	const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = env;

	if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
		return json({ error: 'Server misconfigured.' }, { status: 500 });
	}

	const tableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
	const headers = { Authorization: `Bearer ${AIRTABLE_API_KEY}` };

	const subscribers: { userId: number; email: string; createdAt: string }[] = [];
	let offset: string | undefined;

	do {
		const params = new URLSearchParams({
			
			pageSize: '100'
		});
		if (offset) params.set('offset', offset);

		const res = await fetch(`${tableUrl}?${params}`, { headers });

		if (!res.ok) {
			const text = await res.text();
			console.error('Airtable error:', res.status, text);
			return json({ error: 'Failed to fetch subscribers.' }, { status: 502 });
		}

		const data = await res.json();
		for (const record of data.records) {
			subscribers.push({
				userId: subscribers.length + 1,
				email: record.fields.Email ?? '',
				createdAt: record.createdTime ?? ''
			});
		}
		offset = data.offset;
	} while (offset);

	return json({ subscribers });
};
