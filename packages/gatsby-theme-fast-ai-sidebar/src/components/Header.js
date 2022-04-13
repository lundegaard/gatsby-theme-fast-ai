import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Col,
	Container,
	Row,
	useScrollTrigger,
} from '@fast-ai/ui-components';
import { useIntl } from 'gatsby-plugin-intl';

import m from '../messages';

import Navigation from './Navigation';
import { NavigationRoutes, Ref } from './types';
import AppBar from './AppBar';

const Header = ({
	appLinks,
	fluidLayout,
	nav,
	appSidebar,
	menuVisibility,
	setMenuVisibility,
	appSidebarVisibility,
	setAppSidebarVisibility,
	showContentNavigation,
	appBarProps,
	navigationProps,
	presentedRoutes,
	sx,
	...rest
}) => {
	const intl = useIntl();

	const titleTranslated = intl.formatMessage(m.logoTitle);
	const title = titleTranslated === m.logoTitle.id ? null : titleTranslated;

	const isDocumentScrollProgress = useScrollTrigger({
		disableHysteresis: true,
		threshold: 64,
	});
	const onCloseAppSidebar = () => {
		setAppSidebarVisibility(!appSidebarVisibility);

		if (appSidebarVisibility || !appSidebar.current) {
			return;
		}

		const navlink = appSidebar.current.querySelector('a');

		if (navlink) {
			navlink.focus();
		}
	};
	return (
		<Fragment>
			<Box
				sx={{
					height: 64,
					// NOTE: based on position of appBar
					display: !showContentNavigation
						? 'block'
						: ['block', 'block', 'none'],
				}}
			/>
			<Box
				key="appBarWrapper"
				variant="app-bar-wrapper"
				sx={{
					display: 'flex',
					alignItems: 'center',
					backgroundColor: isDocumentScrollProgress
						? 'rgba(255,255,255,0.7)'
						: ['contrast', 'contrast', 'transparent'],
					backdropFilter: isDocumentScrollProgress ? 'blur(20px)' : 'none',
					position: 'fixed',
					zIndex: 9999,
					top: 0,
					left: 0,
					right: 0,
					borderBottom: t =>
						isDocumentScrollProgress
							? t.borders.normal
							: [t.borders.normal, t.borders.normal, 'none'],
					...(showContentNavigation
						? {
								position: ['fixed', 'fixed', 'static'],
								borderBottom: t => t.borders.normal,
								backgroundColor: isDocumentScrollProgress
									? 'rgba(255,255,255,0.7)'
									: 'contrast',
						  }
						: {}),
				}}
			>
				<Container sx={sx} fluidLayout={fluidLayout} {...rest}>
					<Row>
						<Col span={12}>
							<AppBar
								title={title}
								presentedRoutes={appLinks}
								appSidebarVisibility={appSidebarVisibility}
								onCloseAppSidebar={onCloseAppSidebar}
								{...appBarProps}
							/>
						</Col>
					</Row>
				</Container>
			</Box>
			{showContentNavigation && (
				<Box
					key="content-navigation"
					variant="content-navigation"
					sx={{
						display: 'flex',
						transition: 'background-color 0.3s',
						borderBottom: t => t.borders.normal,
						backgroundColor: isDocumentScrollProgress
							? 'rgba(255,255,255,0.7)'
							: 'contrast',
						backdropFilter: 'blur(20px)',
						position: 'sticky',
						top: [64, 64, 0],
						left: 0,
						right: 0,
						alignItems: 'center',
					}}
				>
					<Container fluidLayout={fluidLayout}>
						<Row>
							<Col span={12}>
								<Navigation
									nav={nav}
									presentedRoutes={presentedRoutes}
									menuVisibility={menuVisibility}
									setMenuVisibility={setMenuVisibility}
									showContentNavigation={showContentNavigation}
									sx={{
										display: 'flex',
										justifyContent: 'flex-start',
										px: 0,
										mx: 0,
										maskImage: 'none',
									}}
									{...navigationProps}
								/>
							</Col>
						</Row>
					</Container>
				</Box>
			)}
		</Fragment>
	);
};

Header.propTypes = {
	appBarProps: PropTypes.object,
	appLinks: NavigationRoutes,
	appSidebar: Ref,
	appSidebarVisibility: PropTypes.bool,
	fluidLayout: PropTypes.bool,
	menuVisibility: PropTypes.bool,
	nav: Ref,
	navigationProps: PropTypes.object,
	presentedRoutes: NavigationRoutes,
	setAppSidebarVisibility: PropTypes.func,
	setMenuVisibility: PropTypes.func,
	showContentNavigation: PropTypes.bool,
};

export default Header;
