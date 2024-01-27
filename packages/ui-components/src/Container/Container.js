import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const Container = forwardRef(
	({ fullWidth: deprecatedFullwidth, fluidLayout, sx, ...rest }, ref) => (
		<Box
			ref={ref}
			variant={
				deprecatedFullwidth || fluidLayout ? 'container-fluid' : 'container'
			}
			sx={{
				px: t =>
					typeof t.grid !== 'undefined' && t.grid.gutters != null
						? t.grid.gutters
						: 2,
				width: '100%',
				...sx,
			}}
			{...rest}
		/>
	),
);

Container.displayName = 'Container';
Container.propTypes = {
	fluidLayout: PropTypes.bool,
	fullWidth: PropTypes.bool,
};

export default Container;
