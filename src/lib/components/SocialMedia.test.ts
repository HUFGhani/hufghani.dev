import { render } from '@testing-library/svelte'
import SocialMedia from './SocialMedia.svelte'

describe(`<SocialMedia/>`, () => {
	it(`should render SocialMedia`, () => {
		const { container } = render(SocialMedia)
		expect(container.innerHTML).toBeDefined()
	})

	describe(`icons`, () => {
		test.each([
			{ socialMedia: 'Github', expected: 'https://github.com/HUFGhani' },
			{ socialMedia: 'Linkedin', expected: 'https://www.linkedin.com/in/hamza-u-f-ghani/' },
			{ socialMedia: 'Twitter', expected: 'https://twitter.com/the_ghani' },
			{ socialMedia: 'Instagram', expected: 'https://www.instagram.com/the.ghani/' },
		])(`should render the $socialMedia icon with url $expected `, ({ socialMedia, expected }) => {
			const { getByLabelText } = render(SocialMedia)
			expect(getByLabelText(socialMedia)).toHaveAttribute('href', expected)
		})

		test.each([
			{ socialMedia: 'Github', expected: 'Github' },
			{ socialMedia: 'Linkedin', expected: 'Linkedin' },
			{ socialMedia: 'Twitter', expected: 'Twitter' },
			{ socialMedia: 'Instagram', expected: 'Instagram' },
		])(
			`should render the $socialMedia icon with $socialMedia aria-label`,
			({ socialMedia, expected }) => {
				const { getByLabelText } = render(SocialMedia)
				expect(getByLabelText(socialMedia)).toHaveAttribute('aria-label', expected)
			}
		)
	})
})
