import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, useBreakpoint, useTheme } from '@fast-ai/ui-components';
import { findLast } from 'ramda';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AppSidebar from '../components/AppSidebar';
import Footer from '../components/Footer';
import ContentContainer from '../components/ContentContainer';
import { appLinks, links } from '../links';
import AppBreadcrumbs from '../components/AppBreadcrumbs';
import { useApplicationNavigationRoute } from '../navigation';
import { IntlProxyContextProvider } from '../intl';

const isSSR = typeof window === 'undefined';

const Root = ({ sx, ...rest }) => (
	<Box
		variant="stripes"
		sx={{
			backgroundColor: 'background',
			fontFamily: 'body',
			minHeight: '100vh',
			height: '100%',
			color: 'body',
			position: 'relative',
			...sx,
		}}
		{...rest}
	/>
);

const PageInner = ({ children, disableBreadcrumbs, fullWidth }) => {
	const [menuVisibility, setMenuVisibility] = useState(false);
	const [appSidebarVisibility, setAppSidebarVisibility] = useState(false);
	const nav = useRef(null);
	const appSidebar = useRef(null);
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

	useEffect(() => {
		setMenuVisibility(false);
		setAppSidebarVisibility(false);
	}, [shouldUseMobileNavigation]);

	return (
		<Root>
			<Header
				appLinks={appLinks}
				presentedRoutes={presentedRoutes}
				fullWidth={fullWidth}
				nav={nav}
				appSidebar={appSidebar}
				menuVisibility={menuVisibility}
				setMenuVisibility={setMenuVisibility}
				appSidebarVisibility={appSidebarVisibility}
				setAppSidebarVisibility={setAppSidebarVisibility}
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
						presentedRoutes={presentedRoutes}
					/>
				)}

				<AppSidebar
					menuVisibility={appSidebarVisibility}
					setMenuVisibility={setAppSidebarVisibility}
					nav={appSidebar}
					presentedRoutes={appLinks}
				/>

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
								display: ['flex', 'flex', 'none'],
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
