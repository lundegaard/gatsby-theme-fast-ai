import React, { forwardRef } from 'react';

import mapResponsiveProperty from '../utils/mapResponsiveProperty';
import Flex from '../Flex';
import useTheme from '../hooks/useTheme';

const Row = forwardRef((props, ref) => {
	const { grid: { gutters = 2 } = {} } = useTheme();

	return (
		<Flex ref={ref} mx={mapResponsiveProperty((x) => -x, gutters)} {...props} />
	);
});
Row.displayName = 'Row';

export default Row;
