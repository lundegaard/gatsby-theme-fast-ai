import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Col,
	Container,
	Flex,
	Hamburger,
	Row,
	useScrollTrigger,
} from '@fast-ai/ui-components';
import { useIntl } from 'gatsby-plugin-intl';

import m from '../messages';

import Logo from './Logo';
import Link from './Link';
import Navigation from './Navigation';
import LanguageSwitcher from './Navigation/LanguageSwitcher';
import AppBreadcrumbs from './AppBreadcrumbs';

const AppBar = props => (
	<Flex
		as="header"
		sx={{
			position: 'relative',
			alignItems: 'center',
			height: 64,
			width: '100%',
			justifyContent: 'space-between',
			zIndex: 100,
		}}
		{...props}
	/>
);

const Header = ({
	fullWidth,
	shouldUseMobileNavigation,
	nav,
	menuVisibility,
	setMenuVisibility,
	appBarProps,
	navigationProps,
	presentedRoutes,
	sx,
	...rest
}) => {
	const intl = useIntl();

	const titleTranslated = intl.formatMessage(m.logoTitle);
	const title = titleTranslated === m.logoTitle.id ? null : titleTranslated;
	// TODO: what to do if there are no sub pages?

	const isDocumentScrollProgress = useScrollTrigger({
		disableHysteresis: true,
		threshold: 64,
	});

	return (
		<Fragment>
			<Box
				sx={{
					...(!fullWidth && shouldUseMobileNavigation
						? {
								position: 'fixed',
								zIndex: 9999,
								top: 0,
								left: 0,
								right: 0,
								backgroundColor: 'rgba(255,255,255,0.7)',
								backdropFilter: 'blur(20px)',
						  }
						: {}),
				}}
			>
				<Container
					fullWidth
					variant={fullWidth ? 'header-fullwidth' : 'header'}
					sx={sx}
					{...rest}
				>
					<Row>
						<Col span={12}>
							<AppBar {...appBarProps}>
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
								<Box
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

									{shouldUseMobileNavigation && (
										<Box
											sx={{
												flexShrink: 0,
												flexGrow: 0,
												overflowX: 'hidden',
											}}
										>
											<Hamburger
												isOpen={menuVisibility}
												onClick={() => {
													setMenuVisibility(!menuVisibility);

													if (menuVisibility || !nav.current) {
														return;
													}

													const navlink = nav.current.querySelector('a');

													if (navlink) {
														navlink.focus();
													}
												}}
											/>
										</Box>
									)}
								</Box>
							</AppBar>
						</Col>
					</Row>
				</Container>
			</Box>
			{!fullWidth && (
				<Box
					variant="submenu"
					sx={{
						display: ['none', 'none', 'flex'],
						transition: 'background-color 0.3s',
						borderBottom: t => t.borders.normal,
						backgroundColor: isDocumentScrollProgress
							? 'rgba(255,255,255,0.7)'
							: 'contrast',
						position: 'sticky',
						top: 0,
						left: 0,
						right: 0,
						alignItems: 'center',
					}}
				>
					<Container fullWidth>
						<Row>
							<Col span={12}>
								<Navigation
									nav={nav}
									presentedRoutes={presentedRoutes}
									menuVisibility={menuVisibility}
									setMenuVisibility={setMenuVisibility}
									fullWidth={fullWidth}
									sx={{
										display: 'flex',
										justifyContent: 'flex-start',
									}}
									{...navigationProps}
								/>
							</Col>
						</Row>
					</Container>
				</Box>
			)}
			{!fullWidth && shouldUseMobileNavigation ? <Box height={64} /> : null}
		</Fragment>
	);
};

Header.propTypes = {
	appBarProps: PropTypes.object,
	fullWidth: PropTypes.bool,
	menuVisibility: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	navigationProps: PropTypes.object,
	presentedRoutes: PropTypes.arrayOf(
		PropTypes.shape({
			to: PropTypes.string,
			label: PropTypes.node,
			children: PropTypes.array,
		}),
	),
	setMenuVisibility: PropTypes.func,
	shouldUseMobileNavigation: PropTypes.bool,
	sx: PropTypes.object,
};

export default Header;
