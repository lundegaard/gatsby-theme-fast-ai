const { author } = require('./package.json');

const siteMetadata = {
	author,
	description: '',
	title: 'FastAI Docs examples',
};

module.exports = {
	siteMetadata,
	pathPrefix: '/docs',
	plugins: [
		{
			resolve: require.resolve('gatsby-theme-fast-ai-sidebar'),
			options: {
				intlOptions: {
					languages: ['en', 'cs'],
					path: `${__dirname}/src/intl`,
					defaultLanguage: 'cs',
				},
				docsPath: `${__dirname}/content/docs`,
				siteMetadata,
			},
		},
	],
};
