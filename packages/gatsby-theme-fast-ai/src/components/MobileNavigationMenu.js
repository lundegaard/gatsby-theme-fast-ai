import React from 'react';
import { Box, Flex } from '@fast-ai/ui-components';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';

import { links } from '../links';

import Link from './Link';

const Menu = props => <Flex as="ul" p={0} m={0} width={1} {...props} />;
const MenuItem = props => (
	<Box
		as="li"
		p={0}
		m={0}
		display="block"
		backgroundColor="primary"
		textAlign="center"
		{...props}
	/>
);

const MobileNavigationMenu = ({ ...rest }) => (
	<Menu flexDirection="column" justifyContent="center" {...rest}>
		{links.map(({ label, to }, i) => (
			<MenuItem
				key={to}
				sx={{
					borderTopStyle: 'solid',
					borderTopWidth: '1px',
					borderTopColor: i === 0 ? 'transparent' : 'background',
				}}
			>
				<Link variant="nav" to={to} display="block" key={to}>
					{label}
				</Link>
			</MenuItem>
		))}
		<IntlContextConsumer>
			{({ languages }) => (
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
								onClick={event => {
									event.preventDefault();

									changeLocale(language);
								}}
								display="block"
								sx={{
									width: '100%',
									borderLeftStyle: 'solid',
									borderLeftWidth: '1px',
									borderLeftColor:
										i === 0 ? 'transparent' : ['background', 'background', 'transparent'],
								}}
							>
								{language}
							</Link>
						))}
					</Flex>
				</MenuItem>
			)}
		</IntlContextConsumer>
	</Menu>
);
export default MobileNavigationMenu;
