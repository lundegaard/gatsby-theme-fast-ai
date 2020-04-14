import React, { Fragment, useState } from 'react';
import { Hamburger } from '@fast-ai/ui-components';
import { keyframes } from '@emotion/core';

import MobileNavigationMenu from './MobileNavigationMenu';

const mobileNavigationKeyframes = keyframes`
from {
	opacity: 0;
	transform: translateX(200%);
}

to {
	opacity: 1;
	transform: translateX(0);
}`;

const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Fragment>
			<Hamburger ml="auto" isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<MobileNavigationMenu
					sx={{ animation: `${mobileNavigationKeyframes} .4s ease-out` }}
					ml="auto"
				/>
			)}
		</Fragment>
	);
};

export default MobileNavigation;
