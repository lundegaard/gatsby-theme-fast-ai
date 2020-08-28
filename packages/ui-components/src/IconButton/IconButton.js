import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const IconButton = forwardRef(({ sx, size = 32, ...rest }, ref) => (
	<Box
		as="button"
		ref={ref}
		{...rest}
		sx={{
			alignItems: 'center',
			appearance: 'none',
			bg: 'transparent',
			border: 'none',
			borderRadius: 4,
			color: 'inherit',
			display: 'inline-flex',
			height: size,
			justifyContent: 'center',
			padding: 1,
			width: size,
			...sx,
		}}
	/>
));

IconButton.displayName = 'IconButton';
IconButton.propTypes = {
	size: PropTypes.number,
	sx: PropTypes.object,
};

export default IconButton;
