export const WEBSITE = 'hufghani.dev'

export const AUTHORNAME = 'Hamza U. F. Ghani'

export const SOCIAL_LINKS: {
	id: number
	title: string
	link: string
}[] = [
	{
		id: 1,
		title: 'Github',
		link: 'https://github.com/HUFGhani',
	},
	{
		id: 2,
		title: `Linkedin`,
		link: `https://www.linkedin.com/in/hamza-u-f-ghani/`,
	},
	{
		id: 3,
		title: `Twitter`,
		link: `https://twitter.com/the_ghani`,
	},
	{
		id: 4,
		title: `Instagram`,
		link: `https://www.instagram.com/the.ghani/`,
	},
]

export const MENULINK: {
	title: string
	link: string
	isExternal: boolean
	abbr?: boolean
	fullTitle?: string
}[] = [
	{
		title: 'About me',
		link: 'aboutMe',
		isExternal: false,
	},
	{
		title: 'Project',
		link: 'project',
		isExternal: false,
	},
	{
		title: 'Blog',
		link: 'blog',
		isExternal: false,
	},
	{
		title: 'CV',
		link: 'docs/Curriculum-Vitae.pdf',
		isExternal: true,
		abbr: true,
		fullTitle: 'Curriculum Vitae',
	},
]
