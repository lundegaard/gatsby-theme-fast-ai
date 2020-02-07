import React from 'react';
import PropTypes from 'prop-types';

import getEventHandlersFromProps from '../utils/getEventHandlersFromProps';
import SuperField from '../SuperField';
import SuperFieldLabel from '../SuperFieldLabel';
import SuperFieldHint from '../SuperFieldHint';
import Input from '../Input';

/**
 * Convenient component for most of the TextFields. But with SuperField is simple to compose its own.
 * It just specified that this is a input field, that can have an error, hint, prefix or suffix.
 */
export const TextField = ({
	id,
	label,
	hasError,
	hint,
	onChange,
	value,
	name,
	disabled,
	readOnly,
	placeholder,
	inputProps,
	labelAlwaysShrank,
	...rest
}) => (
	<SuperField {...rest} disabled={disabled} readOnly={readOnly} hasError={hasError} id={id}>
		<SuperFieldLabel alwaysShrank={labelAlwaysShrank}>{label}</SuperFieldLabel>
		<Input
			type="text"
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={onChange}
			disabled={disabled}
			readOnly={readOnly}
			{...getEventHandlersFromProps(rest)}
			{...inputProps}
		/>
		<SuperFieldHint>{hint}</SuperFieldHint>
	</SuperField>
);
TextField.propTypes = {
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	hint: PropTypes.node,
	id: PropTypes.string,
	inputProps: PropTypes.object,
	label: PropTypes.node,
	labelAlwaysShrank: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any,
};
export default TextField;
