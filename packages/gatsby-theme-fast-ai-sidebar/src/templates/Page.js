import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, useBreakpoint, useTheme } from '@fast-ai/ui-components';
import { findLast } from 'ramda';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ContentContainer from '../components/ContentContainer';
import { links } from '../links';
import AppBreadcrumbs from '../components/AppBreadcrumbs';
import { useApplicationNavigationRoute } from '../navigation';
import { IntlProxyContextProvider } from '../intl';

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
			position: 'relative',
		}}
		{...props}
	/>
);

const PageInner = ({
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

	useEffect(() => {
		setMenuVisibility(false);
	}, [shouldUseMobileNavigation]);

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

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'stretch',
				}}
			>
				{!fullWidth && (
					<Sidebar
						menuVisibility={menuVisibility}
						setMenuVisibility={setMenuVisibility}
						nav={nav}
						shouldUseMobileNavigation={shouldUseMobileNavigation}
						presentedRoutes={presentedRoutes}
						sx={
							{
								// minWidth: 0,
								// flex: 'none',
							}
						}
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
			</Box>

			<Footer />
		</Root>
	);
};
PageInner.propTypes = {
	children: PropTypes.node,
	disableBreadcrumbs: PropTypes.bool,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
};

const Page = props => (
	<IntlProxyContextProvider>
		<PageInner {...props} />
	</IntlProxyContextProvider>
);
Page.propTypes = {
	children: PropTypes.node,
	disableBreadcrumbs: PropTypes.bool,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
};

export default Page;
