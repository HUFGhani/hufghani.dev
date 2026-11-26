import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('renders the footer landmark', () => {
		const { getByRole } = render(Footer);

		expect(getByRole('contentinfo')).toBeInTheDocument();
	});

	it('displays the current copyright year and professional author name', () => {
		const { getByText } = render(Footer);
		const currentYear = new Date().getFullYear();

		expect(getByText(\`© 2017–\${currentYear} Hamza Ghani\`)).toBeInTheDocument();
	});

	it('renders only professional social links with safe external-link attributes', () => {
		const { getByRole, queryByRole } = render(Footer);
		const socialNavigation = getByRole('navigation', { name: 'Social links' });

		for (const [label, url] of [
			['GitHub', 'https://github.com/HUFGhani'],
			['LinkedIn', 'https://www.linkedin.com/in/hamza-u-f-ghani/']
		]) {
			const link = getByRole('link', { name: label });

			expect(socialNavigation).toContainElement(link);
			expect(link).toHaveAttribute('href', url);
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noreferrer');
		}

		expect(queryByRole('link', { name: 'Instagram' })).not.toBeInTheDocument();
	});
});
