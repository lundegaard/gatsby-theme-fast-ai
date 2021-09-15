import path from 'path';
import fs from 'fs';

import mime from 'mime';
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from 'gatsby';

const toBase64 = filePath => {
	// get the mimetype
	const fileMime = mime.getType(filePath);

	const data = fs.readFileSync(filePath, { encoding: 'base64' });

	return `data:${fileMime};base64,${data}`;
};

// TODO: remove for v3
const withPrefix = withAssetPrefix || fallbackWithPrefix;

const getFormat = url => {
	const parts = url.split('.');
	if (parts.length < 2) {
		return;
	}

	const suffix = parts[parts.length - 1];

	if (/svg/.test(suffix)) {
		return 'svg';
	}
	if (/eot/.test(suffix)) {
		return 'embedded-opentype';
	}
	if (/woff2/.test(suffix)) {
		return 'woff2';
	}
	if (/woff/.test(suffix)) {
		return 'woff';
	}
	if (/ttf/.test(suffix)) {
		return 'truetype';
	}
};

const getUrl = (url, loadAsBase64) =>
	loadAsBase64 ? toBase64(url) : withPrefix(path.basename(url));

const wrapIfResult = (fn, x) => (x ? fn(x) : x);

const generateSrc = (critical, files) =>
	files
		.map(({ url, format }) =>
			[
				`url('${getUrl(url, critical)}')`,
				wrapIfResult(x => `format('${x}')`, format || getFormat(url)),
			]
				.filter(Boolean)
				.join(' '),
		)
		.join(',\n');

export const generateStyles = ({ fonts }) =>
	fonts
		.map(({ family, weight, critical, style, files }) =>
			[
				family && `font-family: '${family}'`,
				style && `font-style: ${style}`,
				weight && `font-weight: ${weight}`,
				files && `src: ${generateSrc(critical, files)};`,
			]
				.filter(Boolean)
				.join(';\n'),
		)
		.map(
			x => `@font-face {
	${x}
}`,
		)
		.join('\n');
