import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import FeatureFlagsProviderTestHost from './FeatureFlagsProviderTestHost.svelte';

const flags = { featureA: true, featureB: false };

describe('FeatureFlagsProvider', () => {
	it('provides feature flags through context', () => {
		const { getByText } = render(FeatureFlagsProviderTestHost, {
			props: { flags }
		});

		expect(getByText(JSON.stringify(flags))).toBeInTheDocument();
	});

	it('renders its children', () => {
		const { getByText } = render(FeatureFlagsProviderTestHost, {
			props: { flags: { featureA: true } }
		});

		expect(getByText('Mock Child')).toBeInTheDocument();
	});

	it('updates the context when the provided flags change', async () => {
		const { getByText, rerender } = render(FeatureFlagsProviderTestHost, {
			props: { flags }
		});

		await rerender({ flags: { featureC: true } });

		expect(getByText(JSON.stringify({ featureC: true }))).toBeInTheDocument();
	});
});
