import { STAGED_FONTS_STYLE_ID } from './constants';

const prepend = (node, parent) => {
	if (parent.firstChild) {
		parent.insertBefore(node, parent.firstChild);
	} else {
		parent.appendChild(node);
	}
};

export const injectStyles = (styles) => {
	if (typeof document !== 'undefined') {
		const styleNode = document.getElementById(STAGED_FONTS_STYLE_ID);

		if (styleNode) {
			styleNode.innerHTML = styles;
		} else {
			const node = document.createElement('style');
			node.id = STAGED_FONTS_STYLE_ID;
			node.innerHTML = styles;

			prepend(node, document.head);
		}
	}
};
