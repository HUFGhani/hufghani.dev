import { json } from '@sveltejs/kit';
import { GET_USER_REPOS } from '$lib/queries';

export async function getRepositories(): Promise<Response> {
	try {
		const response = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`
			},
			body: JSON.stringify({
				query: GET_USER_REPOS.loc?.source.body ?? ''
			})
		});

		if (!response.ok) {
			throw new Error(`GitHub API request failed with status ${response.status}`);
		}

		const data = await response.json();

		if ((Array.isArray(data) && data.length === 0) || data.errors?.length) {
			throw new Error('GitHub returned an unsuccessful GraphQL response');
		}

		return json(data, { status: 200 });
	} catch (error) {
		console.error('Error loading repositories:', error);

		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
}
