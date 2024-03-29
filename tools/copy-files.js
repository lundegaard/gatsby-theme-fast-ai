/* eslint-disable no-console */
const path = require('path');

const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

async function includeFileInBuild(file) {
	const sourcePath = path.resolve(packagePath, file);
	const targetPath = path.resolve(buildPath, path.basename(file));
	await fse.copy(sourcePath, targetPath);
	console.log(`Copied ${sourcePath} to ${targetPath}`);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.  That
 * package.json contains information about esm for bundlers so that imports
 * like import Flex from '@fast-ai/components-ui/Flex' are
 * tree-shakeable.
 *
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
	const directoryPackages = glob
		.sync('*/index.js', { cwd: from })
		.map(path.dirname);

	await Promise.all(
		directoryPackages.map(async directoryPackage => {
			const packageJson = {
				sideEffects: false,
				module: path.join('../esm', directoryPackage, 'index.js'),
			};
			const packageJsonPath = path.join(to, directoryPackage, 'package.json');

			await fse.writeFile(
				packageJsonPath,
				JSON.stringify(packageJson, null, 2),
			);

			return packageJsonPath;
		}),
	);
}

async function createPackageFile() {
	const packageData = await fse.readFile(
		path.resolve(packagePath, './package.json'),
		'utf8',
	);
	/* eslint-disable no-unused-vars */
	const {
		nyc,
		scripts,
		devDependencies,
		workspaces,
		publishConfig,
		...packageDataOther
	} = JSON.parse(packageData);
	/* eslint-enable no-unused-vars */

	const newPackageData = {
		...packageDataOther,
		private: false,
		main: './index.js',
		module: './esm/index.js',
	};
	const targetPath = path.resolve(buildPath, './package.json');

	await fse.writeFile(
		targetPath,
		JSON.stringify(newPackageData, null, 2),
		'utf8',
	);
	console.log(`Created package.json in ${targetPath}`);

	return newPackageData;
}

async function prepend(file, string) {
	const data = await fse.readFile(file, 'utf8');
	await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
	const license = `/** @license Fast-ai v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
	await Promise.all(
		[
			'./index.js',
			'./esm/index.js',
			'./umd/fast-ai-ui.development.js',
			'./umd/fast-ai-ui.production.min.js',
		].map(async file => {
			try {
				await prepend(path.resolve(buildPath, file), license);
			} catch (err) {
				if (err.code === 'ENOENT') {
					console.log(`Skipped license for ${file}`);
				} else {
					throw err;
				}
			}
		}),
	);
}

async function run() {
	try {
		const packageData = await createPackageFile();

		await Promise.all(
			[
				packageData.name === '@fast-ai/ui-components'
					? '../../README.md'
					: './README.md',
				packageData.name === '@fast-ai/ui-components' ? './fonts' : './fonts',
				// '../../CHANGELOG.md',
				'../../LICENSE',
			].map(file => includeFileInBuild(file)),
		);

		await addLicense(packageData);

		await createModulePackages({ from: srcPath, to: buildPath });
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

run();
