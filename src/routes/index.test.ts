import { render, screen } from '@testing-library/svelte'
import index from './+page.svelte'

describe('index', () => {
	it('does the page render', () => {
		const { container } = render(index)
		expect(container).toBeDefined()
	})
	it('does the page contain my name', () => {
		render(index)
		expect(screen.getByText("Hi, I'm Hamza;")).toBeInTheDocument()
	})
})
