import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Required for Svelte 5 + jsdom, which does not provide matchMedia.
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Svelte transitions use the Web Animations API, which jsdom does not implement.
Object.defineProperty(Element.prototype, 'animate', {
	configurable: true,
	writable: true,
	value: vi.fn().mockImplementation(() => ({
		cancel: vi.fn(),
		finish: vi.fn(),
		pause: vi.fn(),
		play: vi.fn(),
		reverse: vi.fn(),
		updatePlaybackRate: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		finished: Promise.resolve(),
		ready: Promise.resolve(),
		playState: 'finished',
		currentTime: 0,
		effect: null,
		timeline: null,
		onfinish: null,
		oncancel: null
	}))
});
