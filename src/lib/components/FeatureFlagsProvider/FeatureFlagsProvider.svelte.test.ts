import { render } from '@testing-library/svelte';
import { getContext } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import MockChild from '../../mocks/MockChild.svelte';
import FeatureFlagsProvider from './FeatureFlagsProvider.svelte';

const flags = { featureA: true, featureB: false };

const mockSetContext = vi.fn();
const mockGetContext = vi.fn();
vi.mock('svelte', () => {
	return {
		...vi.importActual('svelte'),
		setContext: () => mockSetContext,
		getContext: () => mockGetContext
	};
});

describe('<FeatureFlagsProvider/>', () => {
	it('should provide feature flags via context', () => {
		mockGetContext.mockReturnValue(flags);

		render(FeatureFlagsProvider, {
			props: {
				children: () => render(MockChild).container.innerHTML,
				flags
			}
		});

		expect(getContext('featureFlags')).toMatchObject;
	});

	it('should render children correctly', () => {
		const flags = { featureA: true };

		const { getByText } = render(FeatureFlagsProvider, {
			props: {
				children: () => render(MockChild).container.innerHTML,
				flags
			}
		});

		expect(getByText('Mock Child')).toBeInTheDocument();
	});
});
