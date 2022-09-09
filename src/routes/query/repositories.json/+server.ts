import { client } from '$lib/utilities/apolloClient'
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
		return new Response(JSON.stringify({ data }))
	} catch (error) {
		console.error('Error', error)
		return new Response(undefined, { status: 500 })
	}
}
