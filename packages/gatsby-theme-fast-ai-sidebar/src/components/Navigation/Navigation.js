import React from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	IconArrowDownward,
	IconArrowForward,
	Text,
} from '@fast-ai/ui-components';
import { useIntl } from 'gatsby-plugin-intl';

import m from '../../messages';
import Match from '../Match';
import Link from '../Link';

import Menu from './Menu';
import MenuItem from './MenuItem';

const Navigation = ({
	presentedRoutes,
	nav,
	menuVisibility,
	setMenuVisibility,
	sx,
	...rest
}) => {
	const intl = useIntl();

	const menuTitleTranslated = intl.formatMessage(m.menuTitle);
	const menuTitle =
		menuTitleTranslated === m.menuTitle.id ? null : menuTitleTranslated;

	return presentedRoutes && presentedRoutes.length ? (
		<Box as="nav" variant="main-nav" sx={sx} {...rest}>
			<Box
				as="button"
				sx={{
					cursor: 'pointer',
					border: 'none',
					display: ['flex', 'flex', 'none'],
					alignItems: 'center',
					px: 0,
					mx: 0,
				}}
				onClick={() => {
					setMenuVisibility(!menuVisibility);

					if (menuVisibility || !nav.current) {
						return;
					}

					const navlink = nav.current.querySelector('a');

					if (navlink) {
						navlink.focus();
					}
				}}
			>
				{menuVisibility ? (
					<IconArrowDownward key="IconArrowDownward" />
				) : (
					<IconArrowForward key="IconArrowForward" />
				)}
				<Text>{menuTitle}</Text>
			</Box>

			<Menu
				sx={{
					display: ['none', 'none', 'flex'],
					listStyle: 'none',
					overflowX: 'auto',
					ml: -3,
				}}
			>
				{presentedRoutes.map(({ label, to }, i) => (
					<MenuItem
						key={`${to}_${i}`}
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
	) : null;
};

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
};

export default Navigation;
