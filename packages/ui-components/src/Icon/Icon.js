import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Icon = forwardRef(({ children, ...rest }, ref) => (
	<div ref={ref} {...rest}>
		{children}
	</div>
));
Icon.displayName = 'Icon';
Icon.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
};

export default Icon;
