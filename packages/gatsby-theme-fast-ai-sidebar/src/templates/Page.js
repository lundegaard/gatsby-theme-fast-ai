import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, useBreakpoint, useTheme } from '@fast-ai/ui-components';
import { findLast } from 'ramda';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ContentContainer from '../components/ContentContainer';
import { links } from '../links';
import AppBreadcrumbs from '../components/AppBreadcrumbs';
import { useApplicationNavigationRoute } from '../navigation';

const isSSR = typeof window === 'undefined';

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
	disableBreadcrumbs: disableBreadcrumbsProp,
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
	const shouldUseMobileNavigation = !useBreakpoint('md', 'up') && !isSSR;

	const fullWidth = !shouldUseMobileNavigation && fullWidthProp;
	const disableBreadcrumbs =
		!shouldUseMobileNavigation && disableBreadcrumbsProp;

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
