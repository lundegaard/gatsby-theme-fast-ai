import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@fast-ai/ui-components';

import Link from './Link';
import { MatchParent, getParent } from './Match';
import Router from './Router';

const getList = links =>
	links ? (
		<ul>
			{links.map((link, i) => {
				const { label, to, children } = link;
				return (
					<MatchParent key={`${to}_${i}`} link={link}>
						{({ match }) => (
							<li
								className={[match && 'active', !children && 'leaf']
									.filter(Boolean)
									.join(' ')}
							>
								<Link
									to={to}
									sx={{
										variant: 'links.nav',
										color: match ? 'primary' : 'inherit',
									}}
								>
									{label}
								</Link>
								{match && children ? getList(children) : null}
								{children ? getList(children) : null}
							</li>
						)}
					</MatchParent>
				);
			})}
		</ul>
	) : null;

const Nav = ({ presentedRoutes }) => getList(presentedRoutes);

const TabLink = ({ link, children, sx }) => (
	<Link sx={{ ...sx, textDecoration: 'none' }} to={link.to}>
		{children}
	</Link>
);
TabLink.propTypes = {
	children: PropTypes.node,
	link: PropTypes.shape({ to: PropTypes.string }),
};

/* eslint-disable react/prop-types */
const Sidebar = ({
	nav,
	menuVisibility,
	sx,
	style,
	children,
	// NOTE: support `render` method because @reach/router has problems with
	// `children`.
	render,
	...rest
}) => (
	<Box
		ref={nav}
		style={{
			transform: menuVisibility ? 'translateX(0)' : 'translateX(-100%)',
			...style,
		}}
		variant="sidebar"
		sx={{
			position: ['fixed', 'fixed', 'sticky'],
			top: 64,
			left: 0,
			// NOTE: z-index defined in theme
			minWidth: 0,
			maxHeight: ['70vh', '70vh', '100vh'],
			overflowY: 'auto',
			WebkitOverflowScrolling: 'touch',
			flex: 'none',
			transition: 'transform .2s ease-out',
			transform: [, , 'none !important'],
			ul: {
				listStyle: 'none',
				p: 0,
			},
			a: { py: 1 },
			...sx,
		}}
		{...rest}
	>
		{children}
		{render ? render() : null}
	</Box>
);

const Menu = ({ presentedRoutes, sx }) =>
	presentedRoutes ? (
		<Box
			sx={{
				px: 3,

				'ul > li > ul > li': {
					borderLeft: t => `1px solid ${t.colors.gray[3]}`,
					pl: '16px',
				},
				'ul > li > ul > li.active.leaf': {
					borderLeft: t => `1px solid ${t.colors.primary}`,
				},
				a: {
					pl: '0px',
				},
				...sx,
			}}
		>
			<Nav presentedRoutes={presentedRoutes} />
		</Box>
	) : null;

/* eslint-enable react/prop-types */

const SidebarWrapper = ({ presentedRoutes, sx, styles = {}, ...rest }) => {
	const sidebarStyles = { ...sx, ...styles.sidebar };

	if (!presentedRoutes || !presentedRoutes.length) {
		return null;
	}
	return (
		<Fragment>
			<Sidebar
				sx={{
					...sidebarStyles,
					display: ['block', 'block', 'none'],
				}}
				{...rest}
			>
				<Menu presentedRoutes={presentedRoutes} />
			</Sidebar>
			<Box
				variant="sidebar-dock"
				sx={{
					display: ['none', 'none', 'block'],
					minHeight: '100vh',
					flexShrink: 0,
					// container has to have height set, otherwide position:sticky do not
					// work
					'& > div, & > div > div': {
						minHeight: '100vh',
						height: '100%',
					},
					...styles.dock,
				}}
			>
				<Router primary={false}>
					{presentedRoutes
						.filter(link => link.children && link.children.length)
						.map((link, i) => (
							<Sidebar
								sx={sidebarStyles}
								path={`${getParent(link)}/*`}
								key={`${link.to}_${i}`}
								render={() => <Menu presentedRoutes={link.children} />}
								{...rest}
							/>
						))}
				</Router>
			</Box>
		</Fragment>
	);
};

SidebarWrapper.propTypes = {
	menuVisibility: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	presentedRoutes: PropTypes.arrayOf(
		PropTypes.shape({
			to: PropTypes.string,
			label: PropTypes.node,
			children: PropTypes.array,
		}),
	),
	setMenuVisibility: PropTypes.func,
	styles: PropTypes.shape({
		dock: PropTypes.object,
		sidebar: PropTypes.object,
	}),
};

export default SidebarWrapper;
