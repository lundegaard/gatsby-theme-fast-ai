import { useCallback, useEffect, useState } from 'react';
import { join, map, o } from 'ramda';

const loadWebfontsWithHtmlApi = o(
	(xs) => Promise.all(xs),
	map(({ name, weight, style }) =>
		document.fonts.load(join(' ', [style, weight, '1em', name]))
	)
);

const loadWebfontsWithFallback = (config) =>
	import('./webfontsFallback').then(({ default: webfontsPolyfill }) =>
		webfontsPolyfill(config)
	);

const loadWebfonts = (config) =>
	typeof window !== 'undefined' && 'fonts' in document
		? loadWebfontsWithHtmlApi(config)
		: loadWebfontsWithFallback(config);

const getStorage = (key) => {
	try {
		return JSON.parse(window.sessionStorage[key]);
	} catch (_error) {
		return null;
	}
};
const setStorage = (key, value) => {
	try {
		window.sessionStorage[key] = JSON.stringify(value);
	} catch (_error) {}
};

const useSessionStorageState = (key, initial) => {
	const current = getStorage(key);

	const [value, setValueInternal] = useState(
		current == null ? initial : current
	);

	const setValue = useCallback(
		(newValue) => {
			setStorage(key, newValue);

			setValueInternal(newValue);
		},
		[setValueInternal, key]
	);

	return [value, setValue];
};

const useWebfonts = (stage1, stage2) => {
	const [fontStage, setFontStage] = useSessionStorageState('sessionStorage', 0);

	useEffect(() => {
		if (stage1 && fontStage === 0) {
			loadWebfonts(stage1).then(() => {
				setFontStage(1);
			});
		}
	}, [stage1, setFontStage, fontStage]);

	useEffect(() => {
		if (stage2 && fontStage === 1) {
			loadWebfonts(stage2).then(() => {
				setFontStage(2);
			});
		}
	}, [stage2, setFontStage, fontStage]);

	return fontStage;
};

export default useWebfonts;
