import React from 'react';
import { Flex } from '@fast-ai/ui-components';

const AppBar = (props) => (
	<Flex
		as="header"
		flexWrap="wrap"
		alignItems="center"
		height={64}
		width={1}
		sx={{ position: 'relative', zIndex: 100 }}
		{...props}
	/>
);

export default AppBar;
