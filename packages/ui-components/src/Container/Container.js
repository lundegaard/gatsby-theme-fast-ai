import React from 'react';
import PropTypes from 'prop-types';

import useTheme from '../hooks/useTheme';
import Box from '../Box';

const Container = ({ fullWidth, ...rest }) => {
	const { breakpoints } = useTheme();

	return (
		<Box
			px={2}
			mx="auto"
			width={1}
			sx={{ maxWidth: fullWidth || !breakpoints ? 'none' : ['none', ...breakpoints] }}
			{...rest}
		/>
	);
};

Container.propTypes = { fullWidth: PropTypes.bool };

export default Container;
