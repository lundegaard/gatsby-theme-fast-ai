import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@fast-ai/ui-components';
import { map } from 'ramda';

import Link from './Link';
import { MatchParent, getParent } from './Match';
import Router from './Router';

const getList = links =>
	links ? (
		<ul>
			{map(link => {
				const { label, to, children } = link;
				return (
					<MatchParent key={to} link={link}>
						{({ match }) => (
							<li
								key={to}
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
							</li>
						)}
					</MatchParent>
				);
			})(links)}
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
	// shouldUseMobileNavigation,
	menuVisibility,
	presentedRoutes,
	sx,
}) =>
	presentedRoutes ? (
		<Box
			ref={nav}
			style={{
				transform: menuVisibility ? 'translateX(0)' : 'translateX(-100%)',
			}}
			variant="sidebar"
			sx={{
				position: ['fixed', 'fixed', 'sticky'],
				top: [0, 0, 64],
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
					padding: 0,
				},
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
			<Box sx={{ px: 3 }}>
				<Nav presentedRoutes={presentedRoutes} />
			</Box>
		</Box>
	) : null;
/* eslint-enable react/prop-types */

const SidebarWrapper = ({
	shouldUseMobileNavigation,
	presentedRoutes,
	sx,
	...rest
}) => {
	if (!presentedRoutes || !presentedRoutes.length) {
		return null;
	}

	if (shouldUseMobileNavigation) {
		return <Sidebar {...rest} presentedRoutes={presentedRoutes} />;
	}
	return (
		<Box
			variant="sidebar-dock"
			sx={{
				minHeight: '100vh',
				flexShrink: 0,
				// container has to have height set, otherwide position:sticky do not
				// work
				'& > div, & > div > div': {
					minHeight: '100vh',
					height: '100%',
				},
				...sx,
			}}
		>
			<Router primary={false}>
				{presentedRoutes.map(link => (
					<Sidebar
						path={`${getParent(link)}/*`}
						key={link.to}
						{...rest}
						presentedRoutes={link.children}
					/>
				))}
			</Router>
		</Box>
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
	shouldUseMobileNavigation: PropTypes.bool,
};

export default SidebarWrapper;
