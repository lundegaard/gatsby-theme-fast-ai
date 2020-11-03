import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

const SuperFieldHint = forwardRef(({ children, sx, ...rest }, ref) => (
	<Text
		ref={ref}
		fontSize={[0, 1]}
		mb={0}
		sx={{ minHeight: '16px', fontSize: 0, letterSpacing: 'mono', ...sx }}
		{...rest}
	>
		{children}
	</Text>
));

SuperFieldHint.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.object,
};

SuperFieldHint.displayName = 'SuperFieldHint';

export default SuperFieldHint;
