import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

const TabLabelText = forwardRef(({ children, sx, ...rest }, ref) => (
	<Text
		sx={{
			whiteSpace: 'nowrap',
			...sx,
		}}
		{...rest}
		ref={ref}
	>
		{children}
	</Text>
));

TabLabelText.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
};

TabLabelText.displayName = 'TabLabelText';

export default TabLabelText;
