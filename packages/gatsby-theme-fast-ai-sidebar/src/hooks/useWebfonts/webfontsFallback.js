import { map } from 'ramda';

const webfontsFallback = (config) =>
	import('fontfaceobserver').then(({ default: FontFaceObserver }) =>
		Promise.all(
			map(({ name, style, weight }) => new FontFaceObserver(name, { style, weight }).load(), config)
		)
	);

export default webfontsFallback;
