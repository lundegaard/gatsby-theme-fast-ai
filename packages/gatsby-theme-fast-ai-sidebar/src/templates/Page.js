/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, useBreakpoint } from '@fast-ai/ui-components';
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
		data-testid="root"
		{...rest}
	/>
);

const PageInner = ({
	children,
	fluidLayout,
	disableBreadcrumbs,
	fullWidth: deprecatedFullwidth,
	showContentNavigation: showContentNavigationProp,
}) => {
	const isMdUp = useBreakpoint('md', 'up');
	// const isMdUp = true;
	const [menuVisibility, setMenuVisibility] = useState(false);
	const [appSidebarVisibility, setAppSidebarVisibility] = useState(false);
	const nav = useRef(null);
	const appSidebar = useRef(null);

	const route = useApplicationNavigationRoute();

	let presentedRoutes = links;

	const showContentNavigation =
		showContentNavigationProp || deprecatedFullwidth === false;

	if (route) {
		const lastRoot = findLast(x => x.root, route.navPath);
		if (lastRoot) {
			presentedRoutes = lastRoot.children || [];
		}
	}
	const shouldUseMobileNavigation = !isMdUp && !isSSR;

	useEffect(() => {
		setMenuVisibility(false);
		setAppSidebarVisibility(false);
	}, [shouldUseMobileNavigation]);

	const content = (
		<Fragment>
			{showContentNavigation && (
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

			<ContentContainer sx={{ flexGrow: 1 }} variant="content">
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
							left: t => t.grid.gutters,
						}}
					/>
				)}
				{children}
			</ContentContainer>
		</Fragment>
	);
	const ContentWrapper = showContentNavigation ? Container : Box;
	return (
		<Root>
			<Header
				appLinks={appLinks}
				presentedRoutes={presentedRoutes}
				showContentNavigation={showContentNavigation}
				fluidLayout={fluidLayout}
				nav={nav}
				appSidebar={appSidebar}
				menuVisibility={menuVisibility}
				setMenuVisibility={setMenuVisibility}
				appSidebarVisibility={appSidebarVisibility}
				setAppSidebarVisibility={setAppSidebarVisibility}
			/>

			<ContentWrapper
				data-testid="content-wrapper"
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'stretch',
				}}
				{...(showContentNavigation ? { fluidLayout } : {})}
			>
				{content}
			</ContentWrapper>
			<Footer />
		</Root>
	);
};
const Page = props => (
	<IntlProxyContextProvider>
		<PageInner {...props} />
	</IntlProxyContextProvider>
);

Page.propTypes = {
	children: PropTypes.node,
	disableBreadcrumbs: PropTypes.bool,
	fluidLayout: PropTypes.bool,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
	showContentNavigation: PropTypes.bool,
};

export default Page;
