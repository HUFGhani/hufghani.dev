import { client } from '$lib/utilities/apolloClient'
import gql from 'graphql-tag'

export const get = async () => {
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
		return {
			body: JSON.stringify({ data }),
		}
	} catch (error) {
		console.error('Error', error)
		return {
			status: 500,
			error: 'Error receiving data',
		}
	}
}
