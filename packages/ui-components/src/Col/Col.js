import React from 'react';
import PropTypes from 'prop-types';

import mapResponsiveProperty from '../utils/mapResponsiveProperty';
import * as Types from '../types';
import Box from '../Box';

const spanToWidth = maxColumns => columnSpan => columnSpan / maxColumns;

// TODO: maxColumns and gutters theamable
const Col = ({ span, maxColumns = 12, ...rest }) => (
	<Box px={2} width={mapResponsiveProperty(spanToWidth(maxColumns), span)} {...rest} />
);

Col.propTypes = {
	maxColumns: PropTypes.number,
	span: Types.responsiveNumber,
};

export default Col;
