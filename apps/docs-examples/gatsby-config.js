const { author } = require('./package.json');

const siteMetadata = {
	author,
	description: '',
	title: 'FastAI Docs examples',
};

const remarkPlugins = [
	{
		resolve: 'gatsby-remark-images',
		options: {
			maxWidth: 1035,
			backgroundColor: 'none',
		},
	},
];

module.exports = {
	siteMetadata,
	plugins: [
		{
			resolve: require.resolve('gatsby-theme-fast-ai'),
			options: {
				intlOptions: {
					languages: ['en', 'cs'],
					path: `${__dirname}/src/intl`,
					defaultLanguage: 'cs',
				},
				siteMetadata,
			},
		},
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				extensions: ['.mdx', '.md'],
				defaultLayouts: {
					default: require.resolve('gatsby-theme-fast-ai/src/templates/MdxPage'),
				},
				plugins: remarkPlugins,
				gatsbyRemarkPlugins: remarkPlugins,
			},
		},
	],
};
