export const setTheme = (theme: string): void => {
	setHTMLAttribute(theme);
	setLocalStorageForTheme();
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
