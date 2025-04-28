import { getContext } from 'svelte';

export function useFeatureFlags() {
	return getContext<{ [key: string]: boolean }>('featureFlags');
}
