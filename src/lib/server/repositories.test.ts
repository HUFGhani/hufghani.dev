import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getRepositories } from './repositories';

vi.mock('$lib/queries', () => ({
	GET_USER_REPOS: {
		loc: {
			source: {
				body: 'query GetUserRepos { viewer { repositories { nodes { name } } } }'
			}
		}
	}
}));

const endpoint = 'https://api.example.com/graphql';
const token = 'test-github-token';
const graphqlQuery =
	'query GetUserRepos { viewer { repositories { nodes { name } } } }';

describe('getRepositories', () => {
	const fetchMock = vi.fn();

	beforeEach(() => {
		vi.stubEnv('VITE_GRAPHQL_ENDPOINT', endpoint);
		vi.stubEnv('VITE_GITHUB_PERSONAL_ACCESS_TOKEN', token);
		vi.stubGlobal('fetch', fetchMock);
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('sends the GraphQL query with the GitHub token and returns repository data', async () => {
		const payload = {
			data: {
				viewer: {
					repositories: {
						nodes: [{ name: 'portfolio' }]
					}
				}
			}
		};
		fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(payload)));

		const response = await getRepositories();

		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual(payload);
		expect(fetchMock).toHaveBeenCalledExactlyOnceWith(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ query: graphqlQuery })
		});
	});

	it('returns a server error when GitHub returns an empty response', async () => {
		fetchMock.mockResolvedValueOnce(new Response(JSON.stringify([])));

		const response = await getRepositories();

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch data' });
	});

	it('returns a server error when GitHub returns GraphQL errors', async () => {
		fetchMock.mockResolvedValueOnce(
			new Response(JSON.stringify({ errors: [{ message: 'Unauthorised' }] }))
		);

		const response = await getRepositories();

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch data' });
	});

	it('returns a server error when GitHub responds with a non-success status', async () => {
		fetchMock.mockResolvedValueOnce(new Response('Unavailable', { status: 503 }));

		const response = await getRepositories();

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch data' });
	});

	it('returns a server error when the GitHub request fails', async () => {
		fetchMock.mockRejectedValueOnce(new Error('Network unavailable'));

		const response = await getRepositories();

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch data' });
	});

	it('returns a server error when GitHub returns invalid JSON', async () => {
		fetchMock.mockResolvedValueOnce(new Response('not-json'));

		const response = await getRepositories();

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch data' });
	});
});
