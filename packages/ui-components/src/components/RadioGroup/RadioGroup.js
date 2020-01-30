import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'ramda-extension';

import Box from '../Box';

const RadioGroup = ({
	children,
	disabled,
	readOnly,
	hasError,
	onChange: onChangeProp,
	value: valueProp,
	...rest
}) => (
	<Box role="radiogroup" {...rest}>
		{Children.map(children, item => {
			const { value, onChange } = item.props;

			if (typeof value === 'undefined') {
				return item;
			}

			return cloneElement(item, {
				onChange: (event, ...restArgs) => {
					if (readOnly || disabled) {
						return;
					}
					onChangeProp(event, ...restArgs);

					if (isFunction(onChange)) {
						return onChange(event, ...restArgs);
					}
				},
				checked: value === valueProp,
				disabled,
				readOnly,
				hasError,
			});
		})}
	</Box>
);

RadioGroup.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Error state */
	hasError: PropTypes.bool,
	/** Called when `onChange` event is triggered on any of children which has `value` prop set. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Current value of the radio group. */
	value: PropTypes.any,
};

export default RadioGroup;
