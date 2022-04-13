import React from 'react';
import { Box } from '@fast-ai/ui-components';

import Match from './Match';
import Link from './Link';
import Menu from './Navigation/Menu';
import MenuItem from './Navigation/MenuItem';
import { NavigationRoutes } from './types';

const AppMenu = ({ presentedRoutes, ...rest }) => (
	<Box as="nav" variant="app-menu" {...rest}>
		{presentedRoutes && presentedRoutes.length ? (
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
		) : null}
	</Box>
);

AppMenu.propTypes = {
	presentedRoutes: NavigationRoutes,
};

export default AppMenu;
