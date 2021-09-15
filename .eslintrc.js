module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	extends: ['eslint-config-lundegaard'],
	rules: {
		'import/order': ['error', { 'newlines-between': 'always' }],
		'sort-imports': [
			'error',
			{
				ignoreCase: false,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
		// for qraphql queries
		'react/prop-types': ['error', { ignore: ['data'] }],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'tools/**/*.js',
					'packages/**/*.test.js',
					'apps/**/*.test.js',
					'apps/**/gatsby-config.js',
					'apps/**/gatsby-ssr.js',
					'apps/**/.storybook-ui/*',
					'testsSetup.js',
					'*.config.js',
					'apps/**/*.config.js',
					'packages/**/*.config.js',
					'rollup.config.js',
				],
			},
		],
		// conflicts with Prettier
	},
};
