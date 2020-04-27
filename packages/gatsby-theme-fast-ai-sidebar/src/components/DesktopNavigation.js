import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Hamburger, TransparentSelect } from '@fast-ai/ui-components';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import { isNotEmpty } from 'ramda-extension';

import { links } from '../links';

import Logo from './Logo';
import Match from './Match';
import Link from './Link';

const Menu = (props) => <Flex as="ul" p={0} m={0} {...props} />;
const MenuItem = (props) => <Box as="li" display="block" p={0} m={0} {...props} />;

const DesktopNavigation = ({ hasSidebar, menu, setMenu, ...rest }) => (
	<Fragment>
		<Link to="/" display="block" ml={2} sx={{ flexShrink: 0 }}>
			<Logo />
		</Link>

		<Flex
			as="nav"
			alignItems="center"
			height="100%"
			width={1}
			mx={2}
			flexShrink={1}
			flexGrow={1}
			flexDirection="row"
			justifyContent="flex-end"
			sx={{
				maskImage: 'linear-gradient(to right,transparent,white 0.5rem,white 98%,transparent)',
			}}
			{...rest}
		>
			<Menu
				sx={{
					listStyle: 'none',
					overflowX: 'auto',
				}}
			>
				{links.map(({ label, to }) => (
					<MenuItem key={to} textAlign={{ _: 'center', md: 'left' }} sx={{ minWidth: 'auto' }}>
						<Match path={`${to}/*`}>
							{({ match }) => (
								<Link
									variant="nav"
									sx={{
										display: 'block',
										color: match ? 'primary' : 'inherit',
										whiteSpace: 'nowrap',
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

		<IntlContextConsumer>
			{({ language: currentLanguage, languages }) =>
				languages &&
				isNotEmpty(languages) && (
					<Box
						sx={{
							flexShrink: 0,
							flexGrow: 1,
							width: '60px',
						}}
					>
						<TransparentSelect
							name="language"
							onChange={(event) => changeLocale(event.target.value)}
							value={currentLanguage}
						>
							{languages.map((language) => (
								<option key={language} value={language}>
									{language}
								</option>
							))}
						</TransparentSelect>
					</Box>
				)
			}
		</IntlContextConsumer>
		{hasSidebar && (
			<Box
				display={['block', 'none']}
				sx={{
					flexShrink: 0,
					flexGrow: 1,
					overflowX: 'hidden',
				}}
			>
				<Hamburger isOpen={menu} onClick={() => setMenu(!menu)} />
			</Box>
		)}
	</Fragment>
);

DesktopNavigation.propTypes = {
	hasSidebar: PropTypes.bool,
	menu: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	setMenu: PropTypes.func,
};

export default DesktopNavigation;
