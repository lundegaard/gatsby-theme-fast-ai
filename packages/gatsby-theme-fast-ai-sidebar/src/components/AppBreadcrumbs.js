import React from 'react';
import PropTypes from 'prop-types';

import { links } from '../links';

import Router from './Router';
import * as types from './types';
import { Breadcrumb, BreadcrumbLink, Breadcrumbs } from './Breadcrumbs';

const AppBreadcrumbs = ({
	breadcrumbs,
	breadcrumbProps,
	breadcrumbLinkProps,
	disableHideFirstSeparator,
	breadcrumbsProps,
	onlyRoots,
}) => (
	<Breadcrumbs {...breadcrumbsProps}>
		{breadcrumbs.map(
			({ to, label, root }, i) =>
				(!onlyRoots || root) && (
					<Breadcrumb
						hideSeparator={!disableHideFirstSeparator && i === 0}
						key={to + i}
						{...breadcrumbProps}
					>
						<BreadcrumbLink to={to} {...breadcrumbLinkProps}>
							{label}
						</BreadcrumbLink>
					</Breadcrumb>
				),
		)}
	</Breadcrumbs>
);

AppBreadcrumbs.propTypes = {
	breadcrumbLinkProps: PropTypes.object,
	breadcrumbProps: PropTypes.object,
	breadcrumbs: PropTypes.arrayOf(types.NavigationRoute),
	breadcrumbsProps: PropTypes.object,
	disableHideFirstSeparator: PropTypes.bool,
	onlyRoots: PropTypes.bool,
};

const getListOfRoutes = (props, links, parents = []) => {
	const children = [];

	if (links) {
		links.forEach((link, i) => {
			const newParents = [...parents, link];

			children.push(...getListOfRoutes(props, link.children, newParents));
			children.push(
				<AppBreadcrumbs
					key={link.to + i}
					path={link.to}
					breadcrumbs={newParents}
					{...props}
				/>,
			);
		});
	}

	return children;
};

const AppBreadcrumbsRouter = ({
	breadcrumbProps,
	breadcrumbLinkProps,
	disableHideFirstSeparator,
	onlyRoots,
	...breadcrumbsProps
}) => (
	<Router primary={false}>
		{getListOfRoutes(
			{
				breadcrumbsProps,
				breadcrumbProps,
				breadcrumbLinkProps,
				disableHideFirstSeparator,
				onlyRoots,
			},
			links,
		)}
	</Router>
);

AppBreadcrumbsRouter.propTypes = {
	breadcrumbLinkProps: PropTypes.object,
	breadcrumbProps: PropTypes.object,
	disableHideFirstSeparator: PropTypes.bool,
	onlyRoots: PropTypes.bool,
};
export default AppBreadcrumbsRouter;
