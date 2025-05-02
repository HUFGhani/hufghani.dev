import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Logo from './Logo.svelte';

describe('<Logo/>', () => {
	test('should render the SVG with the correct viewBox attribute', () => {
		const { container } = render(Logo);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('aria-label', 'Hamza U. F. Ghani');
	});

});
