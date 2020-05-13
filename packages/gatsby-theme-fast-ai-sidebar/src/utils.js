import { compose, defaultTo, find, head, replace, split } from 'ramda';

const getRootPath = compose(
	defaultTo('/'), //
	head,
	split('/'),
	replace(/^\//, '')
);

/*
 * http://localhost:8000/											links[/].children
 * http://localhost:8000/tables								links[tables].children
 * http://localhost:8000/tables/features			links[tables].children
 */
export const getSublinks = (links, pathname) => {
	const activeRootPath = getRootPath(pathname);

	const rootLink = compose(find(({ to }) => getRootPath(to) === activeRootPath))(links);

	return rootLink && rootLink.children;
};

export const copyToClipboard = (str) => {
	const clipboard = window.navigator.clipboard;
	/*
	 * fallback to older browsers (including Safari)
	 * if clipboard API not supported
	 */
	if (!clipboard || typeof clipboard.writeText !== 'function') {
		const textarea = document.createElement('textarea');
		textarea.value = str;
		textarea.setAttribute('readonly', true);
		textarea.setAttribute('contenteditable', true);
		textarea.style.position = 'absolute';
		textarea.style.left = '-9999px';
		document.body.appendChild(textarea);
		textarea.select();
		const range = document.createRange();
		const sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
		textarea.setSelectionRange(0, textarea.value.length);
		document.execCommand('copy');
		document.body.removeChild(textarea);

		return Promise.resolve(true);
	}

	return clipboard.writeText(str);
};

export default copyToClipboard;
