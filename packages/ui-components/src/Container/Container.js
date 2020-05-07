import React from 'react';
import PropTypes from 'prop-types';

import useTheme from '../hooks/useTheme';
import Box from '../Box';

const Container = ({ fullWidth, ...rest }) => {
	const { grid: { gutters = 2 } = {}, breakpoints } = useTheme();

	return (
		<Box
			px={gutters}
			mx="auto"
			width={1}
			sx={{ maxWidth: fullWidth || !breakpoints ? 'none' : ['none', ...breakpoints] }}
			{...rest}
		/>
	);
};

Container.propTypes = { fullWidth: PropTypes.bool };

export default Container;
