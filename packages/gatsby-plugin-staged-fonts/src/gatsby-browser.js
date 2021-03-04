import wrapRootElement from './wrapRootElement';

exports.wrapRootElement = wrapRootElement;

if (process.env.BUILD_STAGE === 'develop') {
	const { injectStyles } = require('./injectStyles');
	const { generateStyles } = require('./generateStyles');

	exports.onClientEntry = (_, pluginOptions) => {
		const styles = generateStyles(pluginOptions);

		injectStyles(styles);
	};
}
