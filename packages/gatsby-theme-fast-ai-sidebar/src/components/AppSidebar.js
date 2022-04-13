import React from 'react';

import Sidebar from './Sidebar';
import { NavigationRoutes } from './types';

const styles = {
	sidebar: {
		top: 0,
	},
	dock: {
		display: ['none', 'none', 'none'],
	},
};
const AppSidebar = ({ sx, ...rest }) => (
	<Sidebar sx={sx} styles={styles} variant="app-sidebar" {...rest} />
);

AppSidebar.propTypes = {
	presentedRoutes: NavigationRoutes,
};

export default AppSidebar;
