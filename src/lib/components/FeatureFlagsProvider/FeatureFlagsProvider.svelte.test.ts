import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import FeatureFlagsProviderTestHost from './FeatureFlagsProviderTestHost.svelte';

const flags = { featureA: true, featureB: false };

describe('<FeatureFlagsProvider/>', () => {
	it('should provide feature flags via context', () => {
		const { getByText } = render(FeatureFlagsProviderTestHost, {
			props: { flags }
		});

		expect(getByText(JSON.stringify(flags))).toBeInTheDocument();
	});

	it('should render children correctly', () => {
		const { getByText } = render(FeatureFlagsProviderTestHost, {
			props: { flags: { featureA: true } }
		});

		expect(getByText('Mock Child')).toBeInTheDocument();
	});
});
