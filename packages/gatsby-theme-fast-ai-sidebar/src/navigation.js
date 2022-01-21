import { matchPath } from '@reach/router';
import { useMemo } from 'react';

import { links } from './links';
import { useIntlContext } from './intl';

const flattenLinks = (links, parents = []) => {
	const children = [];

	if (links) {
		links.forEach(link => {
			const newParents = [...parents, link];

			// NOTE: children paths should be listed before the link itself for cases
			// such as following with want the "A-B" route to match first:
			// 	{
			// 		label: 'A',
			// 		to: '/a/b', // already redirects to subpage
			// 		children: [
			// 			{
			// 				label: 'A-B',
			// 				to: '/a/b',
			children.push(...flattenLinks(link.children, newParents));
			children.push({ link, navPath: newParents });
		});
	}

	return children;
};

export const useApplicationNavigationRoute = () => {
	const { originalPath } = useIntlContext();
	return useMemo(
		() =>
			flattenLinks(links).find(({ link: { to } }) =>
				matchPath(originalPath, to),
			),
		[originalPath],
	);
};
