import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const Modal = forwardRef(({ children, sx, ...rest }, ref) => (
	<Box
		ref={ref}
		sx={{
			borderRadius: '5px',
			backgroundColor: 'background',
			width: ['100%', '75%'],
			overflowY: 'auto',
			overflowX: 'hidden',
			WebkitOverflowScrolling: 'touch',
			...sx,
		}}
		{...rest}
	>
		{children}
	</Box>
));

Modal.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.object,
};
Modal.displayName = 'Modal';

export default Modal;
