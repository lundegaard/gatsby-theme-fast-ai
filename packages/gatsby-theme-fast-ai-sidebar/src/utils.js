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
