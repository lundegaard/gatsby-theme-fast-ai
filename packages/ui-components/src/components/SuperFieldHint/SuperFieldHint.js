import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

const SuperFieldHint = ({ children, ...rest }) => (
	<Text sx={{ minHeight: '16px', fontSize: 0, letterSpacing: 'mono' }} {...rest}>
		{children}
	</Text>
);

SuperFieldHint.propTypes = {
	children: PropTypes.node,
};

export default SuperFieldHint;
