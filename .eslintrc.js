module.exports = {
	root: true,
	extends: ['react-union'],
	plugins: ['react-hooks'],
	rules: {
		'max-len': [
			'error',
			{
				// "Lines of > 80 characters are really the last jabs
				// at the dying corpses of typography and taste in the digital world.
				//
				// Typographically proper paragraphs are not wide across,
				// because that forces the eye to move more while reading.
				//
				// This is a basic fact that has been known for literally longer
				// than we've had printing presses."
				//
				// See:
				// https://katafrakt.me/2017/09/16/80-characters-line-length-limit/#properties-of-the-human-eyes
				// https://nickjanetakis.com/blog/80-characters-per-line-is-a-standard-worth-sticking-to-even-today#reading-code
				// https://hackernoon.com/does-column-width-of-80-make-sense-in-2018-50c161fbdcf6
				//
				// TLDR:
				// - better for your eyes
				// - quicker undertanding of the code
				// - possibility of multiple files side by side on the same display
				code: 80,
				tabWidth: 2,
				ignoreComments: false,
				ignoreStrings: true,
				ignoreRegExpLiterals: true,
				ignoreTemplateLiterals: true,
				ignoreUrls: true,
			},
		],
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
