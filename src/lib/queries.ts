import gql from 'graphql-tag';

export const GET_USER_REPOS = gql`
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
`;
