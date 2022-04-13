import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const Container = forwardRef(({ fullWidth, sx, ...rest }, ref) => (
	<Box
		ref={ref}
		variant={fullWidth ? 'containerFluid' : 'container'}
		sx={{
			mx: 'auto',
			px: t =>
				typeof t.grid !== 'undefined' && t.grid.gutters != null
					? t.grid.gutters
					: 2,
			width: '100%',
			...sx,
		}}
		{...rest}
	/>
));

Container.displayName = 'Container';
Container.propTypes = { fullWidth: PropTypes.bool };

export default Container;
