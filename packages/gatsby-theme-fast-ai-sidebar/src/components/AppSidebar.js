import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';

const styles = {
	sidebar: {
		top: 0,
	},
	dock: {
		display: ['block', 'block', 'none'],
	},
};
const AppSidebar = ({ sx, ...rest }) => (
	<Sidebar sx={sx} styles={styles} variant="app-sidebar" {...rest} />
);

AppSidebar.propTypes = {
	presentedRoutes: PropTypes.arrayOf(
		PropTypes.shape({
			to: PropTypes.string,
			label: PropTypes.node,
			children: PropTypes.array,
		}),
	),
};

export default AppSidebar;
