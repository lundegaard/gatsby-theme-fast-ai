import React from 'react';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import { Box, Tab, TabLabelText, TabList } from '@fast-ai/ui-components';
import { map } from 'ramda';

import Link from './Link';
import Match, { MatchParent } from './Match';

const getList = links =>
	links ? (
		<ul>
			{map(({ label, to, children }) => (
				<li key={to}>
					<Match path={`${withPrefix(to)}`}>
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

const Nav = ({ links }) => getList(links);

const TabLink = ({ link, children, sx }) => (
	<Link sx={{ ...sx, textDecoration: 'none' }} to={link.to}>
		{children}
	</Link>
);
TabLink.propTypes = {
	children: PropTypes.node,
	link: PropTypes.shape({ to: PropTypes.string }),
};

const Sidebar = ({ nav, shouldUseMobileNavigation, menuVisibility, links }) => {
	if (!links) {
		return null;
	}

	return (
		<Box
			ref={nav}
			open={menuVisibility}
			style={{
				transform: menuVisibility ? 'translateX(0)' : 'translateX(-100%)',
			}}
			sx={{
				variant: 'sidebar',
				position: ['fixed', 'fixed', 'sticky'],
				zIndex: 1,
				top: 0,
				left: 0,
				bottom: [0, 0, 'auto'],
				width: ['100%', '100%', 256, 256, 320],
				minWidth: 0,
				maxHeight: ['100vh', '100vh', 'none'],
				overflowY: 'auto',
				WebkitOverflowScrolling: 'touch',
				flex: 'none',
				mt: [64, 64, 0],
				pb: 3,
				bg: ['white', 'white', 'transparent'],
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
				<TabList sx={{ pt: [2], display: ['flex', 'flex', 'none'] }}>
					{links.map(link => (
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
				{links.map(link => (
					<MatchParent key={link.to} link={link}>
						{({ match }) => match && <Nav links={link.children} />}
					</MatchParent>
				))}
			</Box>
		</Box>
	);
};

Sidebar.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			to: PropTypes.string,
			label: PropTypes.node,
			children: PropTypes.array,
		}),
	),
	menuVisibility: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	setMenuVisibility: PropTypes.func,
	shouldUseMobileNavigation: PropTypes.bool,
};

export default Sidebar;
