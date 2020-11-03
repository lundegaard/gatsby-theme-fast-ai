import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import useBlockingEffect from '../hooks/useBlockingEffect';
import { useSuperFieldContext } from '../SuperField';

const SuperFieldLabel = forwardRef(({ children, alwaysShrank }, ref) => {
	const {
		id,
		onLabelShrank,
		onLabelExpand,
		isFocused,
		isInputFilledIn,
		isLabelShrank,
	} = useSuperFieldContext();

	useBlockingEffect(() => {
		if (isInputFilledIn || isFocused || alwaysShrank) {
			onLabelShrank();
		} else {
			onLabelExpand();
		}
	}, [isFocused, isInputFilledIn]);

	return (
		<Label
			htmlFor={id}
			ref={ref}
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				transition: 'color 200ms ease, transform 200ms ease 0ms',
				transform: isLabelShrank
					? 'translate(0, 0) scale(0.75)'
					: 'translate(0, 16px)',
				transformOrigin: 'top left',
				color: 'inherit',
			}}
		>
			{children}
		</Label>
	);
});

SuperFieldLabel.propTypes = {
	alwaysShrank: PropTypes.bool,
	children: PropTypes.node,
};

SuperFieldLabel.displayName = 'SuperFieldLabel';

export default SuperFieldLabel;
