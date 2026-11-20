import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from './+server';

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

function createRequestEvent() {
	return {} as Parameters<typeof GET>[0];
}

describe('GET /api/repositories', () => {
	const fetchMock = vi.fn();

	beforeEach(() => {
		vi.stubEnv('VITE_GRAPHQL_ENDPOINT', endpoint);
		vi.stubEnv('VITE_GITHUB_PERSONAL_ACCESS_TOKEN', token);
		vi.stubGlobal('fetch', fetchMock);
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
		vi.clearAllMocks();
	});

	it('fetches repositories from GitHub and returns the response', async () => {
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

		const response = await GET(createRequestEvent());

		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual(payload);
		expect(fetchMock).toHaveBeenCalledWith(endpoint, {
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

		const response = await GET(createRequestEvent());

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({
			error: 'Failed to fetch data'
		});
	});

	it('returns a server error when the GitHub request fails', async () => {
		fetchMock.mockRejectedValueOnce(new Error('Network unavailable'));

		const response = await GET(createRequestEvent());

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({
			error: 'Failed to fetch data'
		});
	});

	it('returns a server error when GitHub returns invalid JSON', async () => {
		fetchMock.mockResolvedValueOnce(
			new Response('not-json', {
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const response = await GET(createRequestEvent());

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({
			error: 'Failed to fetch data'
		});
	});
});
