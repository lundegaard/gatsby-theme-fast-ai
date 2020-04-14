import React from 'react';
import { Box, Flex } from '@fast-ai/ui-components';
import { Select as RebassSelect } from '@rebass/forms';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';

import { links } from '../links';

import Link from './Link';

const Menu = props => <Flex as="ul" p={0} m={0} width={1} {...props} />;
const MenuItem = props => <Box as="li" p={0} m={0} display="block" {...props} />;

const LanguageSelect = props => (
	<RebassSelect
		sx={{
			color: 'inherit',
			border: 'none',
			fontSize: [2, 2, 2, 4],
			WebkitTapHighlightColor: 'transparent',
			// FF
			'&:invalid': {
				boxShadow: 'none',
			},
			'&:focus': {
				outline: 0,
			},
			width: '100%',
		}}
		px={0}
		{...props}
	/>
);

const DesktopNavigationMenu = ({ ...rest }) => (
	<Menu flexDirection="row" justifyContent="flex-end" alignItems="center" {...rest}>
		{links.map(({ label, to }) => (
			<MenuItem
				key={to}
				backgroundColor={{ _: 'primary', md: 'inherit' }}
				textAlign={{ _: 'center', md: 'left' }}
				ml={4}
			>
				<Link variant="nav" to={to} display="inline-block" key={to}>
					{label}
				</Link>
			</MenuItem>
		))}
		<MenuItem backgroundColor="inherit" textAlign="left" ml={4} width="50px">
			<IntlContextConsumer>
				{({ language: currentLanguage, languages }) => (
					<LanguageSelect
						name="language"
						onChange={event => changeLocale(event.target.value)}
						value={currentLanguage}
					>
						{languages.map(language => (
							<option key={language} value={language}>
								{language}
							</option>
						))}
					</LanguageSelect>
				)}
			</IntlContextConsumer>
		</MenuItem>
	</Menu>
);
export default DesktopNavigationMenu;
