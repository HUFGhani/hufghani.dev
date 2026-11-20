import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Fade from './Fade.svelte';

describe('Fade', () => {
	it('does not render its content while hidden in tests', () => {
		const { queryByText } = render(Fade, {
			props: { visible: false },
			slots: { default: 'Fading content' }
		});

		expect(queryByText('Fading content')).not.toBeInTheDocument();
	});

	it('renders its content when visible', async () => {
		const { getByText } = render(Fade, {
			props: { visible: true },
			slots: { default: 'Fading content' }
		});

		await waitFor(() => expect(getByText('Fading content')).toBeInTheDocument());
	});
});
