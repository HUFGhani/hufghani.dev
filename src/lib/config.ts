export const WEBSITE = 'hufghani.dev';

export const AUTHORNAME = 'Hamza Ghani';

export const SOCIAL_LINKS: {
	id: number;
	title: string;
	link: string;
}[] = [
	{
		id: 1,
		title: 'GitHub',
		link: 'https://github.com/HUFGhani'
	},
	{
		id: 2,
		title: 'LinkedIn',
		link: 'https://www.linkedin.com/in/hamza-u-f-ghani/'
	}
];

export const MENULINK: {
	title: string;
	link: string;
	isExternal: boolean;
	fullTitle?: string;
}[] = [
	{
		title: 'Project',
		link: 'project',
		isExternal: false
	},
	{
		title: 'Blog',
		link: 'blog',
		isExternal: false
	},
	{
		title: 'Experience',
		link: 'experience',
		isExternal: false,
		fullTitle: 'Professional experience'
	}
];

export const NON_PROJECT: string[] = [
	'hacknotts',
	'anvil hack',
	'old hufghani dev',
	'hufghani dev',
	'new hufghani dev',
	'ddclient docker',
	'HUFGHANI',
	'code server',
	'Multiplatform Project iOS and Android',
	'Bluetooth Computer Lock',
	'homebrew brewfile',
	'dotfiles',
	'dotBash',
	'Curriculum Vitae',
	'COMP66090 Masters Project',
	'Personal Website',
	'Portfolio Website',
	'Portfolio',
	'Configuration',
	'Configs',
	'Learning',
	'Tutorial',
	'Tutorials',
	'University Coursework'
];

export const FeatureFlagsList: Record<string, boolean> = {
	showBlog: false
};
