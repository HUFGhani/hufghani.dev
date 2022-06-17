import { render } from "@testing-library/svelte";
import SocialMedia from '$lib/components/SocialMedia.svelte'

describe(`<SocialMedia/>`, () => {
	it(`should render SocialMedia links`, () => {
		const { container } = render(SocialMedia)
		expect(container).toMatchSnapshot()
	})
})
