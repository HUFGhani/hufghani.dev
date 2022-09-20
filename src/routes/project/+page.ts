/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({
	fetch,
}: any): Promise<
	| { props: { data: any }; status?: undefined; error?: undefined }
	| { status: any; error: Error; props?: undefined }
> => {
	const url = '/query/repositories.json'
	const res = await fetch(url, {
		method: 'get',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	const { data } = await res.json()
	const { viewer } = data
	if (res.ok) {
		return {
			viewer,
		}
	}
	return {
		status: res.status,
		error: new Error(`Couldn't load ${url}`),
	}
}
