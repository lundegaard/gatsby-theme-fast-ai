const productionPlugins = [
	[
		'@babel/plugin-transform-react-constant-elements',
		{ allowMutablePropsOnTags: ['FormattedMessage'] },
	],
	[
		'babel-plugin-transform-react-remove-prop-types',
		{
			mode: 'unsafe-wrap',
		},
	],
];

const plugins = [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]];

const config = { plugins };

module.exports = {
	presets: [
		[
			'babel-preset-react-union',
			{ test: process.env.NODE_ENV === 'test', loose: true, library: false, universal: false },
		],
	],
	ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
	env: {
		cjs: {
			plugins: productionPlugins,
		},
		esm: config,
		es: config,
		production: config,
		'production-umd': config,
	},
};
