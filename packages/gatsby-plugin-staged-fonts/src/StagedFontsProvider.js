import React, { useEffect, useMemo } from 'react';

import { Provider } from './context';
import useSession from './useSession';
import { STAGED_FONTS_STORAGE_KEY } from './constants';

const loadWebfontsWithHtmlApi = (fonts) =>
	Promise.all(
		fonts.map(({ family, weight, style }) =>
			document.fonts.load([style, weight, '1em', family].join(' '))
		)
	);

const loadWebfontsWithFallback = (fonts) =>
	import('./webfontsPolyfill').then(({ default: webfontsPolyfill }) =>
		webfontsPolyfill(fonts)
	);

const loadWebfonts = (fonts) =>
	typeof window !== 'undefined' && 'fonts' in document
		? loadWebfontsWithHtmlApi(fonts)
		: loadWebfontsWithFallback(fonts);

// eslint-disable-next-line react/prop-types
const StagedFontsProvider = ({ pluginOptions: { fonts }, children }) => {
	const [stage, setStage] = useSession(STAGED_FONTS_STORAGE_KEY, 0);
	useEffect(
		() => void (stage === 0 && loadWebfonts(fonts).then(() => setStage(1))),
		[fonts, stage, setStage]
	);

	const api = useMemo(() => ({ stage }), [stage]);

	return <Provider children={children} value={api} />;
};

export default StagedFontsProvider;
