module.exports = themeOptions => {
	const {
		intlOptions,
		assetsPath = 'content/assets',
		faviconPath = 'static/favicon.png',
		// Fallback non-translated site metadata.
		siteMetadata,
	} = themeOptions;

	return {
		siteMetadata,
		plugins: [
			'gatsby-plugin-react-helmet',
			{
				resolve: 'gatsby-plugin-intl',
				options: {
					...intlOptions,
				},
			},
			{
				resolve: 'gatsby-source-filesystem',
				options: {
					path: assetsPath,
					name: 'assets',
				},
			},
			'gatsby-plugin-sharp',
			'gatsby-transformer-sharp',
			{
				resolve: require.resolve('@fast-ai/gatsby-plugin-setup'),
			},
			{
				resolve: 'gatsby-plugin-manifest',
				options: {
					icon: faviconPath,
					name: 'Zoe.ai',
					short_name: 'ZoeAI',
					start_url: '/',
					background_color: '#3b3b3b',
					theme_color: '#0018ff',
					display: 'standalone',
				},
			},
		],
	};
};
