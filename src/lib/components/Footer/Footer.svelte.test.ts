import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Footer from "./Footer.svelte";

const renderFooter = () => {
    return render(Footer)
}

describe("<Footer/>", () => {
	it('renders the footer component', () => {
        const {getByTestId}=renderFooter();
		expect(getByTestId('footer')).toBeInTheDocument();
	});

	it('displays the correct copyright year', () => {
		const {getByTestId}=renderFooter();
		const currentYear = new Date().getFullYear();
		expect(getByTestId('copyRight-year').textContent).toContain(`© 2017 - ${currentYear}`);
	});

	it('displays the correct author name', () => {
		const {getByTestId}=renderFooter();
        const currentYear = new Date().getFullYear();
		expect(getByTestId('copyRight-year').textContent).toContain(`© 2017 - ${currentYear}, All right reserved Hamza U. F. Ghani`);
	});

	it('renders the SocialMedia component', () => {
		const {getByText}=renderFooter();
		expect(getByText('Built with SvelteKit · Hosted on S3 and distributed by CloudFront')).toBeInTheDocument();
	});
})