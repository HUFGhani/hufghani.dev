export const setTheme = (theme: string): void => {
	setHTMLAttribute(theme);
	setLocalStorageForTheme();
	setBrowserTheme();
};

export const getTheme = () => {
	const theme = localStorage.getItem('theme');
	return theme != undefined ? theme : null;
};

export const setLocalStorageForTheme = (): void => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	localStorage.setItem('theme', document.documentElement.getAttribute('data-theme')!);
};

export const setHTMLAttribute = (theme: string): void => {
	document.documentElement.setAttribute('data-theme', theme);
};

export const prefersReducedData = (): boolean => {
	return window.matchMedia(`not all and (prefers-reduced-data), (prefers-reduced-data)`).matches;
};
const setBrowserTheme = () => {
	const themeColor = getComputedStyle(document.documentElement)
		.getPropertyValue('--color-base-100')
		.trim();
	console.log('themeColor', themeColor);
	const metaTag = document.querySelector('meta[name="theme-color"]');
	if (metaTag && themeColor) {
		metaTag.setAttribute('content', themeColor);
	}
};
