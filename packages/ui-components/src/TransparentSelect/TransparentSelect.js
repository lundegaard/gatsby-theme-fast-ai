import React, { forwardRef } from 'react';
import { Select as RebassSelect } from '@rebass/forms';

const TransparentSelect = forwardRef((props, ref) => (
	<RebassSelect
		ref={ref}
		css={{
			'&::-ms-expand': {
				display: 'none',
			},
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
));
TransparentSelect.displayName = 'TransparentSelect';

export default TransparentSelect;
