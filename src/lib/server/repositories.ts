import { json } from '@sveltejs/kit';
import { GET_USER_REPOS } from '$lib/queries';

export async function getRepositories(): Promise<Response> {
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
		}).then((response) => response.json());

		if (Array.isArray(data) && data.length === 0) {
			throw new Error('No data found');
		}

		return json(data, { status: 200 });
	} catch (error) {
		console.error('Error loading repositories:', error);

		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
}
