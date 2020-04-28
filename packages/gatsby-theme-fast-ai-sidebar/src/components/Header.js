import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Col, Container, Row } from '@fast-ai/ui-components';

import AppBar from './AppBar';
import Navigation from './Navigation';

const Header = ({ fullWidth, nav, menu, setMenu, appBarProps, navigationProps, sx, ...rest }) => (
	<Fragment>
		<Container
			fullWidth
			variant={fullWidth ? 'header-fullwidth' : 'header'}
			sx={{
				...(!fullWidth
					? {
							position: 'fixed',
							zIndex: 9999,
							top: 0,
							left: 0,
							right: 0,
					  }
					: {}),
				...sx,
			}}
			{...rest}
		>
			<Row>
				<Col span={12}>
					<AppBar {...appBarProps}>
						<Navigation
							nav={nav}
							menu={menu}
							setMenu={setMenu}
							fullWidth={fullWidth}
							{...navigationProps}
						/>
					</AppBar>
				</Col>
			</Row>
		</Container>
		{!fullWidth && <Box height={64} />}
	</Fragment>
);
Header.propTypes = {
	appBarProps: PropTypes.object,
	fullWidth: PropTypes.bool,
	menu: PropTypes.bool,
	nav: PropTypes.exact({
		current: PropTypes.any,
	}),
	navigationProps: PropTypes.object,
	setMenu: PropTypes.func,
	sx: PropTypes.object,
};

export default Header;
