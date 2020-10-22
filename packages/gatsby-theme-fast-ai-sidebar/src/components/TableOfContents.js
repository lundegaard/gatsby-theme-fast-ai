import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Text, useBreakpoint } from '@fast-ai/ui-components';
import { map } from 'ramda';

export const useActiveHash = (itemIds, rootMargin = undefined) => {
	const [activeHash, setActiveHash] = useState('');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveHash(entry.target.id);
					}
				});
			},
			{ rootMargin: rootMargin || '0% 0% -100% 0%' }
		);

		const ids = itemIds;
		const elements = ids.map((id) => document.getElementById(id));

		elements.forEach((element) => {
			observer.observe(element);
		});

		return () => {
			elements.forEach((element) => {
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, [itemIds, rootMargin]);

	return activeHash;
};

/* eslint-disable react/prop-types */
const getNav = ({
	location,
	depth,
	items: itemsProp,
	activeHash,
	maxDepth,
	shouldUseDesktopNavigation,
}) => (
	<ul>
		{map(({ url, title, items }) => (
			<li key={url}>
				<Link
					sx={{
						variant: 'links.nav',
						...(shouldUseDesktopNavigation
							? {
									color: url === `#${activeHash}` ? 'primary' : 'inherit',
							  }
							: {}),
					}}
					href={`${location.pathname}${url}`}
				>
					{title}
				</Link>
				{items &&
					depth < maxDepth &&
					getNav({
						location,
						items,
						shouldUseDesktopNavigation,
						activeHash,
						maxDepth,
						depth: depth + 1,
					})}
			</li>
		))(itemsProp)}
	</ul>
);
/* eslint-enable react/prop-types */

const getHeadingIds = (
	items,
	traverseFullDepth = true,
	depth,
	recursionDepth = 1
) => {
	const idList = [];
	const hashToId = (str) => str.slice(1);

	if (items) {
		for (const item of items) {
			if (item.url) {
				idList.push(hashToId(item.url));
			}

			if (item.items && traverseFullDepth && recursionDepth < (depth || 6)) {
				idList.push(
					...getHeadingIds(item.items, true, depth, recursionDepth + 1)
				);
			}
		}
	}

	return idList;
};

/**
 * @see https://github.com/gatsbyjs/gatsby/blob/master/www/src/components/docs-table-of-contents.js
 */
const TableOfContents = ({
	sx,
	location,
	items,
	maxDepth: maxDepthProp,
	...rest
}) => {
	const maxDepth = maxDepthProp == null ? 4 : maxDepthProp;
	const headingIds = getHeadingIds(items, true, maxDepth);
	const activeHash = useActiveHash(headingIds);
	const shouldUseDesktopNavigation = useBreakpoint('lg', 'up');

	return items ? (
		<Box
			sx={{
				ul: {
					listStyle: 'none',
					padding: 0,
				},
				'li > ul > li > a': {
					pl: '24px',
				},
				color: ['body', 'body', 'body', 'gray.3'],
				borderBottomColor: [
					'secondary',
					'secondary',
					'secondary',
					'transparent',
				],
				borderBottomStyle: 'solid',
				borderBottomWidth: '1px',
				py: [3, 3, 3, 0],
				mb: 4,
				...sx,
			}}
			{...rest}
		>
			<Text fontWeight="normal">Table of Contents</Text>
			{getNav({
				items,
				depth: 1,
				shouldUseDesktopNavigation,
				location,
				maxDepth,
				activeHash,
			})}
		</Box>
	) : null;
};

TableOfContents.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			url: PropTypes.string,
			items: PropTypes.array,
		})
	),
	location: PropTypes.object,
	maxDepth: PropTypes.number,
	sx: PropTypes.object,
};

export default TableOfContents;
