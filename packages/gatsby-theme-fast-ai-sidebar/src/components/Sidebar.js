import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, TabLabelText, TabList } from '@fast-ai/ui-components';
import { map } from 'ramda';

import Link from './Link';
import Match, { MatchParent, getParent } from './Match';
import Router from './Router';

const getList = links =>
	links ? (
		<ul>
			{map(({ label, to, children }) => (
				<li key={to}>
					<Match path={`${to}`}>
						{({ match }) => (
							<Link
								to={to}
								sx={{
									variant: 'links.nav',
									color: match ? 'primary' : 'inherit',
								}}
							>
								{label}
							</Link>
						)}
					</Match>

					{children && getList(children)}
				</li>
			))(links)}
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

const Sidebar = ({
	nav,
	shouldUseMobileNavigation,
	menuVisibility,
	presentedRoutes,
}) => {
	if (!presentedRoutes) {
		return null;
	}

	return (
		<Box
			ref={nav}
			open={menuVisibility}
			style={{
				transform: menuVisibility ? 'translateX(0)' : 'translateX(-100%)',
			}}
			variant="sidebar"
			sx={{
				position: ['fixed', 'fixed', 'sticky'],
				top: 0,
				left: 0,
				bottom: [0, 0, 'auto'],
				// NOTE: z-index defined in theme
				minWidth: 0,
				maxHeight: ['100vh', '100vh', 'none'],
				overflowY: 'auto',
				WebkitOverflowScrolling: 'touch',
				flex: 'none',
				transition: 'transform .2s ease-out',
				transform: [, , 'none !important'],
				ul: {
					listStyle: 'none',
					padding: 0,
				},
				'li > ul > li > a': {
					pl: '24px',
				},
			}}
		>
			{shouldUseMobileNavigation ? (
				<TabList sx={{ pt: [2] }}>
					{presentedRoutes.map(link => (
						<MatchParent key={link.to} link={link}>
							{({ match }) => (
								<Tab
									key={link.to}
									isActive={!!match}
									renderLabel={TabLink}
									link={link}
									label={<TabLabelText>{link.label}</TabLabelText>}
								/>
							)}
						</MatchParent>
					))}
				</TabList>
			) : null}
			<Box sx={{ px: 3 }}>
				<Router primary={false}>
					{presentedRoutes.map(link => (
						<Nav
							path={`${getParent(link)}/*`}
							key={link.to}
							presentedRoutes={link.children}
						/>
					))}
				</Router>
			</Box>
		</Box>
	);
};

Sidebar.propTypes = {
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

export default Sidebar;
