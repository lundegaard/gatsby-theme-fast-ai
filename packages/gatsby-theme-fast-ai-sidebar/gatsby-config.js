const remarkPlugins = [
	{
		resolve: 'gatsby-remark-images',
		options: {
			maxWidth: 1035,
			backgroundColor: 'none',
		},
	},
];

module.exports = (themeOptions) => {
	const {
		intlOptions,
		disableMdx,
		assetsPath = 'content/assets',
		docsPath = 'content/docs',
		faviconPath = 'static/favicon.png',
		pagesPath = 'src/pages',
		// Fallback non-translated site metadata.
		siteMetadata,
	} = themeOptions;

	return {
		siteMetadata,
		plugins: [
			'gatsby-plugin-react-helmet',
			{
				resolve: 'gatsby-source-filesystem',
				options: {
					path: assetsPath,
					name: 'assets',
				},
			},
			{
				resolve: 'gatsby-source-filesystem',
				options: {
					path: pagesPath,
					name: 'pages',
				},
			},
			'gatsby-plugin-sharp',
			'gatsby-transformer-sharp',
			...(!disableMdx
				? [
						{
							resolve: 'gatsby-source-filesystem',
							options: {
								path: docsPath,
								name: 'docs',
							},
						},
						{
							resolve: 'gatsby-plugin-mdx',
							options: {
								extensions: ['.mdx', '.md'],
								plugins: remarkPlugins,
								gatsbyRemarkPlugins: remarkPlugins,
								remarkPlugins: [require('remark-slug')],
							},
						},
				  ]
				: []),
			{
				resolve: require.resolve('@fast-ai/gatsby-plugin-setup'),
			},
			{
				resolve: 'gatsby-plugin-intl',
				options: {
					...intlOptions,
				},
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
