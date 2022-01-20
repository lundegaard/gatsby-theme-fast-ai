import React, { useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { Box, Flex, useBreakpoint, useTheme } from '@fast-ai/ui-components';
import { IntlContextConsumer } from 'gatsby-plugin-intl';
import { matchPath } from '@reach/router';
import { findLast } from 'ramda';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ContentContainer from '../components/ContentContainer';
import { links } from '../links';
import AppBreadcrumbs from '../components/AppBreadcrumbs';

const useIntlContext = () => useContext(IntlContextConsumer._context);

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

const useApplicationNavigationRoute = () => {
	const { originalPath } = useIntlContext();
	return useMemo(
		() =>
			flattenLinks(links).find(({ link: { to } }) =>
				matchPath(originalPath, to),
			),
		[originalPath],
	);
};

const Root = props => (
	<Box
		variant="stripes"
		backgroundColor="background"
		sx={{
			fontFamily: 'body',
			minHeight: '100vh',
			height: '100%',
			color: 'body',
		}}
		{...props}
	/>
);

const Page = ({
	children,
	location,
	disableBreadcrumbs,
	fullWidth: fullWidthProp,
}) => {
	const [menuVisibility, setMenuVisibility] = useState(false);
	const nav = useRef(null);
	const {
		grid: { gutters },
	} = useTheme();

	const route = useApplicationNavigationRoute();

	let presentedRoutes = links;

	if (route) {
		const lastRoot = findLast(x => x.root, route.navPath);
		if (lastRoot) {
			presentedRoutes = lastRoot.children || [];
		}
	}

	const shouldUseMobileNavigation = !useBreakpoint('md', 'up');

	const fullWidth =
		(!shouldUseMobileNavigation && fullWidthProp) ||
		(location && location.pathname === withPrefix('/'));

	return (
		<Root>
			<Header
				fullWidth={fullWidth}
				nav={nav}
				presentedRoutes={presentedRoutes}
				menuVisibility={menuVisibility}
				setMenuVisibility={setMenuVisibility}
				shouldUseMobileNavigation={shouldUseMobileNavigation}
			/>

			<Flex>
				{!fullWidth && (
					<Sidebar
						menuVisibility={menuVisibility}
						setMenuVisibility={setMenuVisibility}
						nav={nav}
						shouldUseMobileNavigation={shouldUseMobileNavigation}
						presentedRoutes={presentedRoutes}
					/>
				)}
				<ContentContainer fullWidth={fullWidth}>
					{!disableBreadcrumbs && (
						<AppBreadcrumbs
							breadcrumbProps={{
								separatorSize: 14,
							}}
							breadcrumbLinkProps={{
								variant: 'links.breadcrumbSm',
							}}
							sx={{
								position: 'absolute',
								top: '8px',
								left: gutters,
							}}
						/>
					)}
					{children}
				</ContentContainer>
			</Flex>

			<Footer />
		</Root>
	);
};

Page.propTypes = {
	children: PropTypes.node,
	disableBreadcrumbs: PropTypes.bool,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
};

export default Page;
