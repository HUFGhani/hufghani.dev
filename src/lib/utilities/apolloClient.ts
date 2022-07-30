import { InMemoryCache } from '@apollo/client/cache'
import { ApolloClient } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { HttpLink } from '@apollo/client/link/http'

class Client {
	static _instance: any
	client: any
	constructor() {
		if (Client._instance) {
			return Client._instance
		}
		Client._instance = this

		this.client = this.setupClient()
	}

	setupClient() {
		const link = new HttpLink({
			uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
			fetch,
		})
		const authLink = setContext((_, { headers }) => {
			return {
				headers: {
					...headers,
					authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
				},
			}
		})
		const client = new ApolloClient({
			credentials: 'include',
			link: authLink.concat(link),
			cache: new InMemoryCache(),
		})
		return client
	}
}

export const client = new Client().client
