import React from 'react';

import mapResponsiveProperty from '../utils/mapResponsiveProperty';
import Flex from '../Flex';
import useTheme from '../hooks/useTheme';

const Row = (props) => {
	const { grid: { gutters = 2 } = {} } = useTheme();

	return <Flex mx={mapResponsiveProperty((x) => -x, gutters)} {...props} />;
};

export default Row;
