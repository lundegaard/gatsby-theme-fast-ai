import React from 'react';
import PropTypes from 'prop-types';
import { isString } from 'ramda-extension';

import getEventHandlersFromProps from '../utils/getEventHandlersFromProps';
import RadioGroup from '../RadioGroup';
import FormGroup from '../FormGroup';

const RadioGroupField = ({
	children,
	onChange,
	value,
	disabled,
	readOnly,
	hasError,
	hint,
	legend,
	name,
	...rest
}) => (
	<FormGroup
		legend={legend}
		hint={hint}
		disabled={disabled}
		readOnly={readOnly}
		hasError={hasError}
		{...rest}
	>
		<RadioGroup
			aria-label={isString(legend) ? legend : null}
			onChange={onChange}
			value={value}
			disabled={disabled}
			readOnly={readOnly}
			hasError={hasError}
			name={name}
			{...getEventHandlersFromProps(rest)}
		>
			{children}
		</RadioGroup>
	</FormGroup>
);

RadioGroupField.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Error state */
	hasError: PropTypes.bool,
	hint: PropTypes.node,
	legend: PropTypes.node,
	name: PropTypes.string,
	/** Called when `onChange` event is triggered on any of children which has `value` prop set. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Current value of the radio group. */
	value: PropTypes.any,
};

export default RadioGroupField;
