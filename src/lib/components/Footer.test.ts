import Footer from '$lib/components/Footer.svelte'
import { render } from '@testing-library/svelte'

describe(`<Footer/>`, () => {
	it(`should render Footer`, () => {
		const { container } = render(Footer)
		expect(container.innerHTML).toBeDefined()
	})

	it(`should render the copyright text correctly`, () => {
		const { getByTestId } = render(Footer)
		expect(getByTestId(`copyRight-year`)).toHaveTextContent(
			`© 2017 - ${new Date().getFullYear()}, All right reserved Hamza U. F. Ghani`
		)
	})
})
