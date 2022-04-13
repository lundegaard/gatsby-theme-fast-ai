import React from 'react';
import { Box } from '@fast-ai/ui-components';

const Menu = ({ sx, ...rest }) => (
	<Box
		sx={{
			display: 'flex',
			p: 0,
			m: 0,
			...sx,
		}}
		as="ul"
		{...rest}
	/>
);

export default Menu;
