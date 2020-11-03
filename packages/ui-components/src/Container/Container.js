import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import useTheme from '../hooks/useTheme';
import Box from '../Box';

const Container = forwardRef(({ fullWidth, ...rest }, ref) => {
	const { grid: { gutters = 2 } = {} } = useTheme();

	return (
		<Box
			ref={ref}
			px={gutters}
			variant={fullWidth ? 'containerFluid' : 'container'}
			mx="auto"
			width={1}
			{...rest}
		/>
	);
});
Container.displayName = 'Container';
Container.propTypes = { fullWidth: PropTypes.bool };

export default Container;
