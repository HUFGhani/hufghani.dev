import NavBar from '$lib/components/NavBar.svelte'
import { render } from '@testing-library/svelte'

describe(`<Header/> with feature flag on`, () => {
	it(`should render Header`, () => {
		const { container } = render(NavBar)
		expect(container).toMatchSnapshot()
	})
})
