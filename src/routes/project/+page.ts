export const prerender = 'ssr'
export const load = async ({
	fetch,
}): Promise<
	| { viewer: any; status?: undefined; error?: undefined }
	| { status: any; error: Error; viewer?: undefined }
> => {
	const res = await fetch('api/repositories.json', {
		method: 'get',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	const { viewer } = await res.json()

	if (res.ok) {
		return {
			viewer,
		}
	}
	return {
		status: res.status,
		error: new Error(`Couldn't load /api/repositories.json`),
	}
}
