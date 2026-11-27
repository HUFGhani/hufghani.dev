import { describe, expect, it, vi } from 'vitest';
import { load } from './+page';

describe('projects page loader', () => {
	it('requests repository data and returns the GitHub viewer', async () => {
		const viewer = {
			repositories: {
				nodes: [{ name: 'portfolio' }]
			}
		};
		const json = vi.fn().mockResolvedValue({ data: { viewer } });
		const fetch = vi.fn().mockResolvedValue({ ok: true, json });

		const result = await load({ fetch } as never);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('/api/repositories', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		expect(json).toHaveBeenCalledTimes(1);
		expect(result).toEqual({ viewer, loadError: false });
	});

	it('returns an empty repository list when the API has no projects', async () => {
		const fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue({
				data: { viewer: { repositories: { nodes: [] } } }
			})
		});

		const result = await load({ fetch } as never);

		expect(result).toEqual({
			viewer: { repositories: { nodes: [] } },
			loadError: false
		});
	});

	it('returns a recoverable error state when the API request fails', async () => {
		const fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const result = await load({ fetch } as never);

		expect(result).toEqual({
			viewer: { repositories: { nodes: [] } },
			loadError: true
		});
		consoleError.mockRestore();
	});

	it('returns a recoverable error state for an invalid API response', async () => {
		const fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue({ data: {} })
		});
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const result = await load({ fetch } as never);

		expect(result).toMatchObject({ loadError: true, viewer: { repositories: { nodes: [] } } });
		consoleError.mockRestore();
	});
});
