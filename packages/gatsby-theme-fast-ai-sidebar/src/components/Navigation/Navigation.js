import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@fast-ai/ui-components';

import Match from '../Match';
import Link from '../Link';

import Menu from './Menu';
import MenuItem from './MenuItem';

const Navigation = ({ presentedRoutes, ...rest }) => (
	<Box as="nav" variant="main-nav" {...rest}>
		<Menu
			sx={{
				listStyle: 'none',
				overflowX: 'auto',
			}}
		>
			{presentedRoutes.map(({ label, to }) => (
				<MenuItem
					key={to}
					textAlign={{ _: 'center', md: 'left' }}
					sx={{ minWidth: 'auto' }}
				>
					<Match path={`${to}/*`}>
						{({ match }) => (
							<Link
								variant="nav"
								sx={{
									display: 'block',
									color: match ? 'primary' : 'inherit',
								}}
								to={to}
								key={to}
							>
								{label}
							</Link>
						)}
					</Match>
				</MenuItem>
			))}
		</Menu>
	</Box>
);
Navigation.propTypes = {
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

export default Navigation;
