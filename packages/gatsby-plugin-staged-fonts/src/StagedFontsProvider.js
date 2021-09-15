import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Provider } from './context';
import useSession from './useSession';
import { STAGED_FONTS_STORAGE_KEY } from './constants';

const loadWebfontsWithHtmlApi = fonts =>
	Promise.all(
		fonts.map(({ family, weight, style }) =>
			document.fonts.load([style, weight, '1em', family].join(' ')),
		),
	);

const loadWebfontsWithFallback = fonts =>
	import('./webfontsPolyfill').then(({ default: webfontsPolyfill }) =>
		webfontsPolyfill(fonts),
	);

const loadWebfonts = fonts =>
	typeof window !== 'undefined' && 'fonts' in document
		? loadWebfontsWithHtmlApi(fonts)
		: loadWebfontsWithFallback(fonts);

const useImmutableProp = x => {
	const [y] = useState(x);
	return y;
};

// eslint-disable-next-line react/prop-types
const StagedFontsProvider = ({
	pluginOptions: {
		fonts,
		alwaysLoadCriticalsFirst: alwaysLoadCriticalsFirstProp,
	},
	children,
}) => {
	const alwaysLoadCriticalsFirst = useImmutableProp(
		alwaysLoadCriticalsFirstProp,
	);
	/* eslint-disable react-hooks/rules-of-hooks */
	const [stage, setStage] = alwaysLoadCriticalsFirst
		? useState(0)
		: useSession(STAGED_FONTS_STORAGE_KEY, 0);
	/* eslint-enable react-hooks/rules-of-hooks */

	useEffect(
		() => void (stage === 0 && loadWebfonts(fonts).then(() => setStage(1))),
		[fonts, stage, setStage],
	);

	const api = useMemo(() => ({ stage }), [stage]);

	return <Provider children={children} value={api} />;
};

const FontDescription = PropTypes.shape({
	critical: PropTypes.bool,
	family: PropTypes.string.isString,
	files: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
		}).isRequired,
	).isRequired,
	style: PropTypes.any,
	weight: PropTypes.any,
});

StagedFontsProvider.propTypes = {
	children: PropTypes.node,
	pluginOptions: PropTypes.shape({
		alwaysLoadCriticalsFirst: PropTypes.bool,
		fonts: PropTypes.arrayOf(FontDescription),
	}).isRequired,
};

export default StagedFontsProvider;
