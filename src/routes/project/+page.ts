// Keep production rendering server-side; E2E builds disable SSR so browser-level API mocks
// can control repository responses without calling GitHub during the test run.
export const ssr = import.meta.env.VITE_E2E_TESTING !== 'true';
export const csr = true;

const emptyViewer = {
	repositories: {
		nodes: []
	}
};

export async function load({ fetch }) {
	try {
		const response = await fetch('/api/repositories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Repository request failed with status ${response.status}`);
		}

		const payload = await response.json();
		const viewer = payload?.data?.viewer;

		if (!Array.isArray(viewer?.repositories?.nodes)) {
			throw new Error('Repository response did not contain a repository list');
		}

		return { viewer, loadError: false };
	} catch (error) {
		console.error('Unable to load projects:', error);
		return { viewer: emptyViewer, loadError: true };
	}
}
