import React from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const Backdrop = ({ sx, ...rest }) => (
	<Box
		sx={{
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'body',
			opacity: 0.5,
			zIndex: 1000,
			...sx,
		}}
		{...rest}
	/>
);
Backdrop.propTypes = { sx: PropTypes.object };

export default Backdrop;
