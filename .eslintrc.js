module.exports = {
	root: true,
	extends: ['react-union'],
	plugins: ['react-hooks'],
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
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
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
		'react/jsx-max-props-per-line': 0,
		'react/jsx-fragments': [2, 'element'],
		'react/jsx-curly-brace-presence': [2, 'never'],
	},
};
