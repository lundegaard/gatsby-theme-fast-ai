const path = require('path');

const remarkPlugins = [
	{
		resolve: 'gatsby-remark-images',
		options: {
			maxWidth: 1035,
			backgroundColor: 'none',
		},
	},
];

const fontsPath = path.resolve(
	require.resolve('@fast-ai/ui-components'),
	'../../fonts/files'
);

const getFontFile = (url) => ({ url: path.join(fontsPath, url) });

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
				resolve: require.resolve('@fast-ai/gatsby-plugin-staged-fonts'),
				options: {
					fonts: [
						{
							critical: true,
							files: [
								getFontFile('open-sans-v17-latin-ext_latin-700-critical.woff'),
								getFontFile('open-sans-v17-latin-ext_latin-700-critical.woff2'),
							],
							family: 'Open Sans Critical',
							style: 'normal',
							weight: 700,
						},
						{
							critical: true,
							files: [
								getFontFile('roboto-v20-latin-ext_latin-regular-critical.woff'),
								getFontFile(
									'roboto-v20-latin-ext_latin-regular-critical.woff2'
								),
							],
							family: 'Roboto Critical',
							weight: 400,
						},
						{
							files: [
								getFontFile('open-sans-v17-latin-ext_latin-regular.woff'),
								getFontFile('open-sans-v17-latin-ext_latin-regular.woff2'),
							],
							family: 'Open Sans',
							style: 'normal',
							weight: 400,
						},
						{
							files: [
								getFontFile('open-sans-v17-latin-ext_latin-700.woff'),
								getFontFile('open-sans-v17-latin-ext_latin-700.woff2'),
							],
							family: 'Open Sans',
							style: 'normal',
							weight: 700,
						},
						{
							family: 'Roboto',
							weight: 400,
							files: [
								getFontFile('roboto-v20-latin-ext_latin-regular.woff'),
								getFontFile('roboto-v20-latin-ext_latin-regular.woff2'),
							],
						},
						{
							family: 'Roboto',
							style: 'italic',
							weight: 400,
							files: [
								getFontFile('roboto-v20-latin-ext_latin-italic.woff'),
								getFontFile('roboto-v20-latin-ext_latin-italic.woff2'),
							],
						},
						{
							family: 'Roboto',
							style: 'normal',
							weight: 700,
							files: [
								getFontFile('roboto-v20-latin-ext_latin-700.woff'),
								getFontFile('roboto-v20-latin-ext_latin-700.woff2'),
							],
						},
						{
							family: 'Roboto Mono',
							style: 'normal',
							weight: 400,
							files: [
								getFontFile('roboto-mono-v7-latin-ext_latin-regular.woff'),
								getFontFile('roboto-mono-v7-latin-ext_latin-regular.woff2'),
							],
						},
					],
				},
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
