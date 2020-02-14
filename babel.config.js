const productionPlugins = [];

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
		esm: {
			plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
		},
		es: {
			plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
		},
		production: {
			plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
		},
		'production-umd': {
			plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
		},
	},
};
