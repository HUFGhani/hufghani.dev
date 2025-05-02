import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import SocialMedia from './SocialMedia.svelte';

describe('SocialMedia Component', () => {
	it('renders the component', () => {
		const { container } = render(SocialMedia);
		expect(container).toBeInTheDocument();
	});

	it('renders all social media links', () => {
		const { getByLabelText } = render(SocialMedia);

		// Check if Github link is rendered
		const githubLink = getByLabelText('Github');
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'));

		// Check if Linkedin link is rendered
		const linkedinLink = getByLabelText('Linkedin');
		expect(linkedinLink).toBeInTheDocument();
		expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));

		// Check if Instagram link is rendered
		const instagramLink = getByLabelText('Instagram');
		expect(instagramLink).toBeInTheDocument();
		expect(instagramLink).toHaveAttribute('href', expect.stringContaining('instagram.com'));
	});

	it('renders icons with correct classes', () => {
		const { container } = render(SocialMedia);

		// Check if icons have the correct CSS classes
		const icons = container.querySelectorAll('svg');
		icons.forEach((icon) => {
			expect(icon).toHaveClass('w-7');
			expect(icon).toHaveClass('h-7');
		});
	});
});
