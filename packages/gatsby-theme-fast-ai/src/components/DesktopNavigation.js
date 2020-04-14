import React from 'react';
import { Flex } from '@fast-ai/ui-components';

import DesktopNavigationMenu from './DesktopNavigationMenu';

const DesktopNavigation = () => (
	<Flex as="nav" alignItems="center" height="100%">
		<DesktopNavigationMenu ml="auto" width={1} />
	</Flex>
);

export default DesktopNavigation;
