module.exports = {
	siteMetadata: {
		title: 'Zoe',
	},
	plugins: [
		{
			resolve: require.resolve('gatsby-theme-fast-ai'),
			options: {
				intlOptions: {
					languages: ['en', 'cs'],
					path: `${__dirname}/src/intl`,
					defaultLanguage: 'cs',
				},
			},
		},
	],
};
