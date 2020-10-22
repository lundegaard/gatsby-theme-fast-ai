/* eslint-disable import/no-extraneous-dependencies */
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.js';
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
};
const babelOptions = {
	exclude: /node_modules/,
	// We are using @babel/plugin-transform-runtime
	runtimeHelpers: true,
	configFile: '../../babel.config.js',
};
const commonjsOptions = {
	ignoreGlobal: true,
	include: /node_modules/,
	namedExports: {
		'../../node_modules/prop-types/index.js': [
			'elementType',
			'bool',
			'func',
			'object',
			'oneOfType',
			'element',
		],
		'../../node_modules/react-is/index.js': [
			'ForwardRef',
			'isFragment',
			'isLazy',
			'isMemo',
			'isValidElementType',
		],
	},
};

const onwarn = (warning, warn) => {
	if (warning.code === 'THIS_IS_UNDEFINED') {
		return;
	}
	warn(warning); // this requires Rollup 0.46
};

export default [
	{
		input,
		output: {
			file: 'build/umd/fast-ai-ui.development.js',
			format: 'umd',
			name: 'FastAIUI',
			globals,
		},
		onwarn,
		external: Object.keys(globals),
		plugins: [
			json(),
			nodeResolve(),
			babel(babelOptions),
			commonjs(commonjsOptions),
			nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
			replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		],
	},
	{
		input,
		onwarn,
		output: {
			file: 'build/umd/fast-ai-ui.production.min.js',
			format: 'umd',
			name: 'FastAIUI',
			globals,
		},
		external: Object.keys(globals),
		plugins: [
			json(),
			nodeResolve(),
			babel(babelOptions),
			commonjs(commonjsOptions),
			nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
			replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
			sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
			terser(),
		],
	},
];
