import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from '@fast-ai/ui-components';

import AppBar from './AppBar';
import DesktopNavigation from './DesktopNavigation';

const Header = ({ hasSidebar, menu, setMenu }) => (
	<Container fullWidth>
		<Row>
			<Col span={12}>
				<AppBar>
					<DesktopNavigation hasSidebar={hasSidebar} menu={menu} setMenu={setMenu} />
				</AppBar>
			</Col>
		</Row>
	</Container>
);
Header.propTypes = {
	hasSidebar: PropTypes.bool,
	menu: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	setMenu: PropTypes.func,
};

export default Header;
