const { author } = require('./package.json');

const siteMetadata = {
	author,
	description: '',
	title: 'Zoe.ai',
};

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
	],
};
