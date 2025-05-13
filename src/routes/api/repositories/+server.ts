export const prerender = true;
import { GET_USER_REPOS } from '$lib/queries';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const data = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`
			},
			body: JSON.stringify({
				query: GET_USER_REPOS.loc?.source.body ?? ''
			})
		}).then((res) => res.json());
		if (data.length === 0) {
			throw new Error('No data found');
		}
		return json(data, { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.error('Error loading repositories:', error);
		return json(
			{ error: 'Failed to fetch data' },
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
