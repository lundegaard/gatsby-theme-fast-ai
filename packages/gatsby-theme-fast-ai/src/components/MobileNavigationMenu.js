import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@fast-ai/ui-components';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import { isNotEmpty } from 'ramda-extension';
import { withPrefix } from 'gatsby';

import { links } from '../links';

import Match from './Match';
import Link from './Link';

const Menu = (props) => <Flex as="ul" p={0} m={0} width={1} {...props} />;
const MenuItem = ({ sx, ...rest }) => (
	<Box
		as="li"
		sx={{
			p: 0,
			m: 0,
			display: 'block',
			textAlign: 'center',
			...sx,
		}}
		{...rest}
	/>
);
MenuItem.propTypes = { sx: PropTypes.object };

const MobileNavigationMenu = ({ ...rest }) => (
	<Menu flexDirection="column" justifyContent="center" {...rest}>
		{links.map(({ label, to }, i) => (
			<Match key={to} path={`${withPrefix(to)}/*`}>
				{({ match }) => {
					const color = match ? 'primary' : 'white';

					return (
						<MenuItem
							key={to}
							sx={{
								borderTopStyle: 'solid',
								borderTopWidth: '1px',
								borderTopColor: i === 0 ? 'transparent' : 'background',
								backgroundColor: match ? 'white' : 'primary',
							}}
						>
							<Link
								variant="nav"
								sx={{
									display: 'block',
									color: [color, color, color],
									'&:hover': {
										color: [color, color, color],
									},
								}}
								to={to}
								key={to}
							>
								{label}
							</Link>
						</MenuItem>
					);
				}}
			</Match>
		))}
		<IntlContextConsumer>
			{({ languages }) =>
				languages &&
				isNotEmpty(languages) && (
					<MenuItem
						sx={{
							borderTopStyle: 'solid',
							borderTopWidth: '1px',
							borderTopColor: 'background',
						}}
					>
						<Flex>
							{languages.map((language, i) => (
								<Link
									key={language}
									variant="nav"
									to={`/${language}`}
									onClick={(event) => {
										event.preventDefault();

										changeLocale(language);
									}}
									display="block"
									sx={{
										width: '100%',
										borderLeftStyle: 'solid',
										borderLeftWidth: '1px',
										borderLeftColor:
											i === 0
												? 'transparent'
												: ['background', 'background', 'transparent'],
									}}
								>
									{language}
								</Link>
							))}
						</Flex>
					</MenuItem>
				)
			}
		</IntlContextConsumer>
	</Menu>
);
export default MobileNavigationMenu;
