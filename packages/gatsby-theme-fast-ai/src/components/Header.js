import React, { useEffect, useState } from 'react';
import {
	Col,
	Container,
	Flex,
	Row,
	useBreakpoint,
} from '@fast-ai/ui-components';

import AppBar from './AppBar';
import Logo from './Logo';
import Link from './Link';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

const Header = () => {
	const shouldUseDesktopNavigation = useBreakpoint('md', 'up');
	const [useDesktopNavigation, setUseDesktopNavigation] = useState(true);

	useEffect(() => {
		setUseDesktopNavigation(shouldUseDesktopNavigation);
	}, [shouldUseDesktopNavigation]);

	return (
		<Container>
			<Row py={{ _: 2, md: 5 }}>
				<AppBar>
					<Col as={Flex} span={{ _: 4, lg: 2 }}>
						<Link to="/" display="block">
							<Logo />
						</Link>
					</Col>

					{useDesktopNavigation ? (
						<Col span={{ _: 8, lg: 10 }}>
							<DesktopNavigation />
						</Col>
					) : (
						<MobileNavigation />
					)}
				</AppBar>
			</Row>
		</Container>
	);
};

export default Header;
