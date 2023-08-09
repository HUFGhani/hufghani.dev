import NavBar from '$lib/components/NavBar.svelte'
import { getTheme } from '$lib/utlis'
import { fireEvent, render, screen } from '@testing-library/svelte'
import { describe } from 'vitest'

describe(`<NavBar/>`, () => {
	it(`should render NavBar`, () => {
		const { container } = render(NavBar)
		expect(container.innerHTML).toBeDefined()
	})

	describe('localStorage theme testing', () => {
		beforeEach(() => {
			localStorage.clear()
		})
		test('should set and get the theme from localStorage', async () => {
			const theme = 'light'

			global.Math.random = () => 0.01
			render(NavBar)

			const button = screen.getByRole('button')
			await fireEvent.click(button)

			expect(getTheme()).toBe(theme)
		})

		test('should return null for the theme if not set', () => {
			expect(getTheme()).toBeNull()
		})
	})
})
