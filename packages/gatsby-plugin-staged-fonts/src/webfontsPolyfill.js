const webfontsPolyfill = (config) =>
	import('fontfaceobserver').then(({ default: FontFaceObserver }) =>
		Promise.all(
			config.map(({ family, style, weight }) =>
				new FontFaceObserver(family, { style, weight }).load()
			)
		)
	);

export default webfontsPolyfill;
