import React from 'react';
import { Select as RebassSelect } from '@rebass/forms';

const TransparentSelect = props => (
	<RebassSelect
		sx={{
			color: 'inherit',
			border: 'none',
			fontSize: [2, 2, 2, 4],
			WebkitTapHighlightColor: 'transparent',
			// FF
			'&:invalid': {
				boxShadow: 'none',
			},
			'&:focus': {
				outline: 0,
			},
			width: '100%',
		}}
		px={0}
		{...props}
	/>
);

export default TransparentSelect;
