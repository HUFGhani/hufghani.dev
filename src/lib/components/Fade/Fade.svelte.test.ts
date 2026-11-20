import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import FadeTestHost from './FadeTestHost.svelte';

describe('Fade', () => {
	it('does not render its content while hidden in tests', () => {
		const { queryByText } = render(FadeTestHost, {
			props: { visible: false }
		});

		expect(queryByText('Fading content')).not.toBeInTheDocument();
	});

	it('renders its content when visible', () => {
		const { getByText } = render(FadeTestHost, {
			props: { visible: true }
		});

		expect(getByText('Fading content')).toBeInTheDocument();
	});
});
