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
		assetsPath = 'content/assets',
		faviconPath = 'static/favicon.png',
		pagesPath = 'src/pages',
		// Fallback non-translated site metadata.
		siteMetadata,
		disableMdx,
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
			{
				resolve: 'gatsby-source-filesystem',
				options: {
					path: pagesPath,
					name: 'pages',
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
			...(!disableMdx
				? [
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
				  ]
				: []),
		],
	};
};
