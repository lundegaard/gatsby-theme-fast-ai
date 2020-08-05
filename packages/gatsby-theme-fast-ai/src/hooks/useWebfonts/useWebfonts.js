import { useEffect, useState } from 'react';
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

const useWebfonts = (config) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);

		loadWebfonts(config).then(() => setLoaded(true));
	}, [config]);

	return loaded;
};

export default useWebfonts;
