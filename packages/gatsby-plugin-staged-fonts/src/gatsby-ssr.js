import React from 'react';

import { STAGED_FONTS_STYLE_ID } from './constants';
import wrapRootElement from './wrapRootElement';

// eslint-disable-next-line
import stylesToInline from '!!raw-loader!./fonts.css';

exports.wrapRootElement = wrapRootElement;

/* eslint-disable react/no-danger */
exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<style
			id={STAGED_FONTS_STYLE_ID}
			key={STAGED_FONTS_STYLE_ID}
			dangerouslySetInnerHTML={{ __html: stylesToInline }}
		/>,
	]);
};
/* eslint-enable react/no-danger */

// Move styles to the top of the head section.
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	const headComponents = getHeadComponents();
	headComponents.sort((x, y) => {
		if (x && x.key === STAGED_FONTS_STYLE_ID) {
			return -1;
		} else if (y && y.key === STAGED_FONTS_STYLE_ID) {
			return 1;
		}
		return 0;
	});
	replaceHeadComponents(headComponents);
};
