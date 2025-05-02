import { setTheme } from '$lib/utlis';
import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import NavBar from './NavBar.svelte';

    const mockGetTheme = vi.fn();
    vi.mock('$lib/utlis', () => {
        return {
            ...vi.importActual('$lib/utlis'),
        getTheme: () => mockGetTheme,
        setTheme: vi.fn(),
        setHTMLAttribute: vi.fn(),
        setLocalStorageForTheme: vi.fn(),
        }
    });
    


    describe('NavBar.svelte', () => {
        it('should render the NavBar component', () => {
            const { getByLabelText } = render(NavBar);
            expect(getByLabelText('Go to Homepage')).toBeInTheDocument();
        });

        it('should call selectRandomTheme and set a random theme', async () => {
            const { getByLabelText } = render(NavBar);
            const randomThemeButton = getByLabelText('random theme selector');

            mockGetTheme.mockReturnValue('light');

            await fireEvent.click(randomThemeButton);

            expect(setTheme).toHaveBeenCalled();
            expect(setTheme).toHaveBeenCalledWith(expect.any(String));
        });
    });