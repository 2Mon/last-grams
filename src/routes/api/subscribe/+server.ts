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

	const tableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
	const headers = {
		Authorization: `Bearer ${AIRTABLE_API_KEY}`,
		'Content-Type': 'application/json'
	};

	// Get current max number
	const listRes = await fetch(
		`${tableUrl}?sort%5B0%5D%5Bfield%5D=Number&sort%5B0%5D%5Bdirection%5D=desc&maxRecords=1`,
		{ headers }
	);

	let nextNumber = 1;
	if (listRes.ok) {
		const data = await listRes.json();
		if (data.records?.length > 0 && data.records[0].fields?.Number) {
			nextNumber = data.records[0].fields.Number + 1;
		}
	}

	// Create record with email and number
	const res = await fetch(tableUrl, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			records: [{ fields: { Email: email, Number: nextNumber } }]
		})
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('Airtable error:', res.status, text);
		return json({ error: 'Failed to subscribe. Try again later.' }, { status: 502 });
	}

	return json({ success: true, number: nextNumber });
};
