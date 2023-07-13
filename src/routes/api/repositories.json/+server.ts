import { client } from '$lib/utilities/apolloClient'
import { error, json } from '@sveltejs/kit'
import gql from 'graphql-tag'

export const GET = async () => {
	try {
		const query = gql`
			query githubReop {
				viewer {
					repositories(last: 100, isFork: false) {
						nodes {
							name
							url
							description
							isArchived
							isTemplate
							primaryLanguage {
								name
							}
						}
					}
				}
			}
		`

		const { data } = await client.query({ query })
		console.log(data)
		return json(data)
	} catch {
		throw error(500, 'could not fetch post')
	}
}
