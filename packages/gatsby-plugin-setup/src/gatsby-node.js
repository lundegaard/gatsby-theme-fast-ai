const path = require('path');

const { omit, includes } = require('ramda');
const { rejectNil } = require('ramda-extension');

const stages = {
	DEVELOP: 'develop',
	DEVELOP_HTML: 'develop-html',
	BUILD_JAVASCRIPT: 'build-javascript',
	BUILD_HTML: 'build-html',
};

const setBabel = ({ getConfig, stage, loaders, actions }) => {
	const config = getConfig();
	const rule = config.module.rules.filter((rule) =>
		includes('jsx', String(rule.test))
	)[0];
	const PRODUCTION = !stage.includes('develop');

	config.module.rules = [
		// Omit the default rule for jsx files
		...config.module.rules.filter(
			(rule) => !includes('jsx', String(rule.test))
		),
		{
			...rule,
			use: [
				loaders.js({
					configFile: false,
					compact: PRODUCTION,
					presets: [
						[
							'babel-preset-react-union',
							{
								test: process.env.NODE_ENV === 'test',
								loose: true,
								library: false,
								universal: false,
							},
						],
					],
				}),
			],
		},
	];

	if (config.resolve) {
		// https://github.com/gatsbyjs/gatsby/issues/15601#issuecomment-530131304
		config.resolve.alias = omit(['core-js'], config.resolve.alias);

		config.resolve.modules = rejectNil([
			...(config.resolve.modules || []),
			path.resolve(__dirname, '../../node_modules/gatsby/node_modules'), // for Gatsby's core-js@2 - monorepo
			path.resolve(__dirname, '../node_modules/gatsby/node_modules'), // for Gatsby's core-js@2 - monorepo
			path.resolve(__dirname, '../../gatsby/node_modules'), // for Gatsby's core-js@2 - monorepo
			path.resolve(__dirname, '../gatsby/node_modules'), // for Gatsby's core-js@2 - monorepo
			path.resolve(__dirname, './node_modules'),
			'node_modules', // your modules w/ core-js@3
		]);
	}

	// NOTE: for debug purposes:
	// console.dir(config, { depth: null });

	actions.replaceWebpackConfig(config);
};

// 🔥
const setHotDOM = ({ getConfig, stage }) => {
	const config = getConfig();
	if (stage.startsWith(stages.DEVELOP) && config.resolve) {
		config.resolve.alias = {
			...config.resolve.alias,
			'react-dom': '@hot-loader/react-dom',
		};
	}
};

exports.onCreateWebpackConfig = (...args) => {
	setBabel(...args);
	setHotDOM(...args);

	// NOTE: For debugging purposes:
	// console.dir(args[0].getConfig(), { depth: null });
};
