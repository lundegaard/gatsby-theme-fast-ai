const path = require('path');

const glob = require('glob');

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
	require.resolve('@fast-ai/ui-components/fonts'),
	'../web-files',
);

const getFontFile = url => ({ url: path.join(fontsPath, url) });
// const getFontFile = url => ({
// 	url: `@fast-ai/ui-components/fonts/web-files/${ url}`,
// });

const weights = {
	thin: 100,
	extralight: 200,
	light: 300,
	normal: 400,
	regular: 400,
	medium: 500,
	semibold: 600,
	extrabold: 800,
	bold: 700,
	black: 900,
	100: 100,
	200: 200,
	300: 300,
	400: 400,
	500: 500,
	600: 600,
	700: 700,
	800: 800,
	900: 900,
};
const isItalic = x => x.indexOf('italic') !== -1;
const defaultFontOptions = {
	getStyle: x => (isItalic(x) ? 'italic' : undefined),
	getWeight: x => {
		let result;

		Object.entries(weights).forEach(([keyword, weight]) => {
			if (x.indexOf(`-${keyword}`) !== -1) {
				result = weight;
			}
		});
		if (!result && isItalic(x)) {
			return 400;
		}
		return result;
	},
};

const fonts = [
	{
		family: 'Open Sans',
		file: 'opensans-*.+(woff|woff2)',
		ignore: 'opensans*critical.+(woff|woff2)',
	},
	{
		family: 'Open Sans Critical',
		file: 'opensans*critical.+(woff|woff2)',
		critical: true,
	},
	{
		family: 'Roboto',
		file: 'roboto-!(mono)*.+(woff|woff2)',
		ignore: [
			'roboto-!(mono)*critical.+(woff|woff2)',
			'roboto-mono*.+(woff|woff2)',
		],
	},
	{
		family: 'Roboto Critical',
		file: 'roboto-!(mono)*critical.+(woff|woff2)',
		critical: true,
	},
	{
		family: 'Roboto Mono',
		file: 'roboto-mono*.+(woff|woff2)',
		ignore: 'roboto-mono*critical.+(woff|woff2)',
	},
	{
		family: 'Roboto Mono Critical',
		file: 'roboto-mono*critical.+(woff|woff2)',
		critical: true,
	},
];

let fontsGrouped = {};
fonts.forEach(({ family, file, ignore, ...rest }) => {
	const fontFiles = glob.sync(file, { ignore, cwd: fontsPath });

	fontsGrouped = fontFiles.reduce((acc, next) => {
		const name = next.replace(/\.[^/.]+$/, '');
		if (!acc[name]) {
			acc[name] = { name, family, files: [next], ...rest };
		} else {
			acc[name].files = [...acc[name].files, next];
		}
		return acc;
	}, fontsGrouped);
});

const fontsStaged = Object.values(fontsGrouped).map(
	({ critical, family, name, files }) => ({
		family,
		style: defaultFontOptions.getStyle(name),
		weight: defaultFontOptions.getWeight(name),
		files: files.map(getFontFile),
		critical,
	}),
);

module.exports = themeOptions => {
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
					alwaysLoadCriticalsFirst: true,
					fonts: fontsStaged,
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
