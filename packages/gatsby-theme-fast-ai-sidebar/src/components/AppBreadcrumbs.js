import React from 'react';
import PropTypes from 'prop-types';

import Router from './Router';
import * as types from './types';
import { Breadcrumb, BreadcrumbLink, Breadcrumbs } from './Breadcrumbs';

const AppBreadcrumbs = ({
	breadcrumbs,
	breadcrumbProps,
	breadcrumbLinkProps,
	disableHideFirstSeparator,
	breadcrumbsProps,
}) => (
	<Breadcrumbs {...breadcrumbsProps}>
		{breadcrumbs.map(({ to, label }, i) => (
			<Breadcrumb
				hideSeparator={!disableHideFirstSeparator && i === 0}
				key={to}
				{...breadcrumbProps}
			>
				<BreadcrumbLink to={to} {...breadcrumbLinkProps}>
					{label}
				</BreadcrumbLink>
			</Breadcrumb>
		))}
	</Breadcrumbs>
);

AppBreadcrumbs.propTypes = {
	breadcrumbLinkProps: PropTypes.object,
	breadcrumbProps: PropTypes.object,
	breadcrumbs: PropTypes.arrayOf(types.NavigationRoute),
	breadcrumbsProps: PropTypes.object,
	disableHideFirstSeparator: PropTypes.bool,
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
	links,
	breadcrumbProps,
	breadcrumbLinkProps,
	disableHideFirstSeparator,
	...breadcrumbsProps
}) => (
	<Router primary={false}>
		{getListOfRoutes(
			{
				breadcrumbsProps,
				breadcrumbProps,
				breadcrumbLinkProps,
				disableHideFirstSeparator,
			},
			links,
		)}
	</Router>
);

AppBreadcrumbsRouter.propTypes = {
	breadcrumbLinkProps: PropTypes.object,
	breadcrumbProps: PropTypes.object,
	disableHideFirstSeparator: PropTypes.bool,
	links: PropTypes.arrayOf(types.NavigationRoute),
};
export default AppBreadcrumbsRouter;
