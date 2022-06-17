import NavBar from '$lib/components/NavBar.svelte'
import { render } from '@testing-library/svelte'

describe(`NavBar/>`, () => {
	it(`should render NavBar`, () => {
		const { container } = render(NavBar)
		expect(container).toMatchSnapshot()
	})
})
