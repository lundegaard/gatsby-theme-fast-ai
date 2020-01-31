const path = require('path');
const { lstatSync, readdirSync } = require('fs');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
	readdirSync(source)
		.map(name => path.join(source, name))
		.filter(isDirectory);

module.exports = {
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-knobs',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
				babelOptions: {
					root: path.resolve('..'),
					rootMode: 'upward',
				},
				sourceLoaderOptions: null,
			},
		},
	],
	webpackFinal: config => {
		const apps = getDirectories(path.resolve(__dirname, '../../'));
		const packages = getDirectories(path.resolve(__dirname, '../../../packages'));

		config.module.rules = config.module.rules.map(rule => {
			rule.include = [...apps, ...packages];

			if (rule.use && rule.use[0] && /babel/.test(rule.use[0].loader)) {
				rule.use[0].options = {
					root: path.resolve('..'),
					rootMode: 'upward',
				};
			}

			if (rule.use && rule.use[0] && /style/.test(rule.use[0])) {
				rule.use[0].options = {
					root: path.resolve('..'),
				};
				rule.include = [...(rule.include || []), path.resolve(__dirname, '../../../node_modules')];
			}

			return rule;
		});

		return config;
	},
};
