export const setTheme = (theme: string): void => {
	setHTMLAttribute(theme)
	setLocalStorageForTheme()
}

export const setLocalStorageForTheme = (): void => {
	localStorage.setItem('theme', document.documentElement.getAttribute('data-theme')!)
}

export const setHTMLAttribute = (theme: string): void => {
	document.documentElement.setAttribute('data-theme', theme)
}
