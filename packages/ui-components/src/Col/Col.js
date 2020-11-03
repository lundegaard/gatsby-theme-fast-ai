import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import mapResponsiveProperty from '../utils/mapResponsiveProperty';
import * as Types from '../types';
import Box from '../Box';
import useTheme from '../hooks/useTheme';

const spanToWidth = (maxColumns) => (columnSpan) => columnSpan / maxColumns;

const Col = forwardRef(({ span, maxColumns: maxColumnsProp, ...rest }, ref) => {
	const { grid: { gutters, maxColumns } = {} } = useTheme();

	return (
		<Box
			ref={ref}
			px={gutters}
			width={mapResponsiveProperty(
				spanToWidth(isNil(maxColumnsProp) ? maxColumns : maxColumnsProp),
				span
			)}
			{...rest}
		/>
	);
});
Col.displayName = 'Col';

Col.propTypes = {
	maxColumns: PropTypes.number,
	span: Types.responsiveNumber,
};

export default Col;
