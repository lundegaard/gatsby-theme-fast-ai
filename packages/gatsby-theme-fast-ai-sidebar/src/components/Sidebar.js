import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@fast-ai/ui-components';
import { map } from 'ramda';

import Link from './Link';
import Match from './Match';

const getList = (links) =>
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

const Nav = ({ links }) => getList(links);

const Sidebar = ({ nav, menu, setMenu, links }) => (
	<Box
		ref={nav}
		open={menu}
		onClick={() => void setMenu(false)}
		onBlur={() => void setMenu(false)}
		onFocus={() => void setMenu(true)}
		style={{
			transform: menu ? 'translateX(0)' : 'translateX(-100%)',
		}}
		sx={{
			variant: 'sidebar',
			position: ['fixed', 'sticky'],
			// boxShadow: menu ? ['0px 0px 5px 0px rgba(0,0,0,0.25)', 'none'] : 'none',
			zIndex: 1,
			top: 0,
			left: 0,
			bottom: [0, 'auto'],
			width: [256, 256, 256, 256, 320],
			minWidth: 0,
			maxHeight: ['100vh', 'none'],
			overflowY: 'auto',
			WebkitOverflowScrolling: 'touch',
			flex: 'none',
			px: 3,
			mt: [64, 0],
			pb: 3,
			bg: ['white', 'transparent'],
			transition: 'transform .2s ease-out',
			transform: [, 'none !important'],
			ul: {
				listStyle: 'none',
				padding: 0,
			},
			'li > ul > li > a': {
				pl: '24px',
			},
		}}
	>
		<Nav links={links} />
	</Box>
);

Sidebar.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({ to: PropTypes.string, label: PropTypes.node, children: PropTypes.array })
	),
	menu: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	setMenu: PropTypes.func,
};

export default Sidebar;
