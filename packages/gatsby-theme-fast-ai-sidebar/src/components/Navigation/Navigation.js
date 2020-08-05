import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Hamburger } from '@fast-ai/ui-components';
import { withPrefix } from 'gatsby';

import { links } from '../../links';
import Logo from '../Logo';
import Match from '../Match';
import Link from '../Link';

import Menu from './Menu';
import MenuItem from './MenuItem';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = ({ fullWidth, nav, menu, setMenu }) => (
	<Fragment>
		<Link to="/" display="block" ml={4} sx={{ flexShrink: 0 }}>
			<Logo />
		</Link>

		<Flex as="nav" variant="main-nav">
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
		</Flex>

		<LanguageSwitcher />

		{!fullWidth && (
			<Box
				display={['block', 'none']}
				sx={{
					flexShrink: 0,
					flexGrow: 1,
					overflowX: 'hidden',
				}}
			>
				<Hamburger
					isOpen={menu}
					onClick={() => {
						setMenu(!menu);
						if (menu || !nav.current) {
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
	</Fragment>
);

Navigation.propTypes = {
	fullWidth: PropTypes.bool,
	menu: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	setMenu: PropTypes.func,
};

export default Navigation;
