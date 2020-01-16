import React from 'react';
import { Col, Flex } from '@fast-ai/ui-components';

import { links } from '../links';

import Link from './Link';

const Menu = props => <Flex as="ul" p={0} m={0} width={1} {...props} />;
const MenuItem = props => <Col as="li" p={0} m={0} display="block" {...props} />;

const NavigationMenu = ({ ...rest }) => (
	<Menu
		flexDirection={{ _: 'column', md: 'row' }}
		justifyContent={{ _: 'center', md: 'flex-end' }}
		{...rest}
	>
		{links.map(({ label, to }, i) => (
			<MenuItem
				span={{ _: 12, md: 2 }}
				key={to}
				backgroundColor={{ _: 'primary', md: 'inherit' }}
				textAlign={{ _: 'center', md: 'left' }}
				sx={{
					borderTopStyle: 'solid',
					borderTopWidth: '1px',
					borderTopColor: i === 0 ? 'transparent' : ['background', 'background', 'transparent'],
				}}
			>
				<Link variant="nav" to={to} display={{ _: 'block', md: 'inline-block' }} key={to}>
					{label}
				</Link>
			</MenuItem>
		))}
	</Menu>
);
export default NavigationMenu;
