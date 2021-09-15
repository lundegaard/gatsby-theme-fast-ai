import React from 'react';
import { Box, Flex, TransparentSelect } from '@fast-ai/ui-components';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import { isNotEmpty } from 'ramda-extension';
import { withPrefix } from 'gatsby';

import { links } from '../links';

import Match from './Match';
import Link from './Link';

const Menu = props => <Flex as="ul" p={0} m={0} width={1} {...props} />;

const MenuItem = props => (
	<Box as="li" p={0} m={0} display="block" {...props} />
);

const DesktopNavigationMenu = ({ ...rest }) => (
	<Menu
		flexDirection="row"
		justifyContent="flex-end"
		alignItems="center"
		{...rest}
	>
		{links.map(({ label, to }) => (
			<MenuItem
				key={to}
				backgroundColor={{ _: 'primary', md: 'inherit' }}
				textAlign={{ _: 'center', md: 'left' }}
				ml={4}
			>
				<Match path={`${withPrefix(to)}/*`}>
					{({ match }) => {
						const color = match ? 'primary' : 'inherit';

						return (
							<Link
								variant="nav"
								sx={{
									display: 'inline-block',
									color: [color, color, color],
								}}
								to={to}
								key={to}
							>
								{label}
							</Link>
						);
					}}
				</Match>
			</MenuItem>
		))}
		<IntlContextConsumer>
			{({ language: currentLanguage, languages }) =>
				languages &&
				isNotEmpty(languages) && (
					<MenuItem
						backgroundColor="inherit"
						textAlign="left"
						ml={4}
						width="50px"
					>
						<TransparentSelect
							name="language"
							onChange={event => changeLocale(event.target.value)}
							value={currentLanguage}
						>
							{languages.map(language => (
								<option key={language} value={language}>
									{language}
								</option>
							))}
						</TransparentSelect>
					</MenuItem>
				)
			}
		</IntlContextConsumer>
	</Menu>
);
export default DesktopNavigationMenu;
