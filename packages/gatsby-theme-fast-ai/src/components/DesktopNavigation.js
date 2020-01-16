import React from 'react';
import { Flex } from '@fast-ai/ui-components';

import NavigationMenu from './NavigationMenu';

const DesktopNavigation = () => (
	<Flex as="nav" alignItems="center" height="100%">
		<NavigationMenu ml="auto" width={1} />
	</Flex>
);

export default DesktopNavigation;
