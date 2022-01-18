import React from 'react';
import { Box } from '@fast-ai/ui-components';
import { withPrefix } from 'gatsby';

import { links } from '../../links';
import Match from '../Match';
import Link from '../Link';

import Menu from './Menu';
import MenuItem from './MenuItem';

const Navigation = props => (
	<Box as="nav" variant="main-nav" {...props}>
		<Menu
			sx={{
				listStyle: 'none',
				overflowX: 'auto',
			}}
		>
			{links.map(({ label, to }) => (
				<MenuItem
					key={to}
					textAlign={{ _: 'center', md: 'left' }}
					sx={{ minWidth: 'auto' }}
				>
					<Match path={`${withPrefix(to)}/*`}>
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

export default Navigation;
