import React from 'react';
import PropTypes from 'prop-types';
import { Box, Hamburger } from '@fast-ai/ui-components';

import { NavigationRoutes } from './types';
import Logo from './Logo';
import Link from './Link';
import LanguageSwitcher from './Navigation/LanguageSwitcher';
import AppBreadcrumbs from './AppBreadcrumbs';
import AppMenu from './AppMenu';

const Root = ({ sx, ...rest }) => (
	<Box
		as="header"
		sx={{
			display: 'flex',
			position: 'relative',
			alignItems: 'center',
			width: '100%',
			justifyContent: 'space-between',
			zIndex: 100,
			...sx,
		}}
		{...rest}
	/>
);

const AppBar = ({
	title,
	appSidebarVisibility,
	onCloseAppSidebar,
	presentedRoutes,
	...rest
}) => (
	<Root variant="app-bar" {...rest}>
		<Link
			to="/"
			sx={{
				alignItems: 'center',
				display: 'flex',
				ml: 4,
				textDecoration: 'none',
				color: 'inherit',
				flexShrink: 0,
			}}
		>
			<Logo />
			{title && <Box variant="logo-title">{title}</Box>}
		</Link>

		<AppBreadcrumbs
			onlyRoots
			disableHideFirstSeparator
			sx={{
				display: ['none', 'none', 'flex'],
				flexShrink: 0,
			}}
		/>

		<AppMenu
			presentedRoutes={presentedRoutes}
			sx={{
				display: ['none', 'none', 'flex'],
				justifyContent: 'flex-end',
				width: '100%',
			}}
		/>

		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				minWidth: 'unset',
			}}
		>
			<LanguageSwitcher sx={{ flexShrink: 0 }} />

			<Box
				sx={{
					display: ['block', 'block', 'none'],
					flexShrink: 0,
					flexGrow: 0,
					overflowX: 'hidden',
				}}
			>
				<Hamburger isOpen={appSidebarVisibility} onClick={onCloseAppSidebar} />
			</Box>
		</Box>
	</Root>
);

AppBar.propTypes = {
	appSidebarVisibility: PropTypes.bool,
	onCloseAppSidebar: PropTypes.func,
	presentedRoutes: NavigationRoutes,
	title: PropTypes.node,
};

export default AppBar;
