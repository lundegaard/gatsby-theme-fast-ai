import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

const SuperFieldHint = ({ children, sx, ...rest }) => (
	<Text
		fontSize={[0, 1]}
		sx={{ minHeight: '16px', fontSize: 0, letterSpacing: 'mono', ...sx }}
		{...rest}
	>
		{children}
	</Text>
);

SuperFieldHint.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.object,
};

export default SuperFieldHint;
