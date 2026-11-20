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
		const fetch = vi.fn().mockResolvedValue({ json });

		const result = await load({ fetch } as never);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('/api/repositories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		expect(json).toHaveBeenCalledTimes(1);
		expect(result).toEqual({ viewer });
	});
});
