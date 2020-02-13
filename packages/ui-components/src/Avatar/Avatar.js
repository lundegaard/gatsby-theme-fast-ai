import React from 'react';
import PropTypes from 'prop-types';

import mapResponsiveProperty from '../utils/mapResponsiveProperty';
import * as Types from '../types';
import Box from '../Box';

const addPx = mapResponsiveProperty(x => `${x}px`);

const Avatar = ({ size = 35, sx, ...rest }) => (
	<Box
		display="block"
		sx={{
			backgroundColor: 'white',
			width: size,
			height: size,
			lineHeight: addPx(size),
			textAlign: 'center',
			fontWeight: 'bold',
			borderRadius: 9999,
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'transparent',
			...sx,
		}}
		{...rest}
	/>
);

Avatar.propTypes = {
	size: Types.responsiveNumber,
	sx: PropTypes.object,
};

export default Avatar;
