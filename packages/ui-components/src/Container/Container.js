import React from 'react';
import PropTypes from 'prop-types';

import useTheme from '../hooks/useTheme';
import Box from '../Box';

const Container = ({ fullWidth, ...rest }) => {
	const { grid: { gutters = 2 } = {} } = useTheme();

	return (
		<Box
			px={gutters}
			variant={fullWidth ? 'containerFluid' : 'container'}
			mx="auto"
			width={1}
			{...rest}
		/>
	);
};

Container.propTypes = { fullWidth: PropTypes.bool };

export default Container;
