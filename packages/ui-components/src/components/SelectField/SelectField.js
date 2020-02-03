import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';
import SuperField from '../SuperField';
import SuperFieldLabel from '../SuperFieldLabel';
import SuperFieldHint from '../SuperFieldHint';

/**
 * Convenient component for most of the SelectFields. But with SuperField is simple to compose its own.
 * It just specified that this is a input field, that can have an error, hint, prefix or suffix.
 */
const SelectField = ({
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
	getLabel,
	getValue,
	items,
	...rest
}) => (
	<SuperField {...rest} disabled={disabled} readOnly={readOnly} hasError={hasError} id={id}>
		<SuperFieldLabel alwaysShrank={!!(labelAlwaysShrank || placeholder)}>{label}</SuperFieldLabel>
		<Select
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={onChange}
			disabled={disabled}
			readOnly={readOnly}
			items={items}
			getLabel={getLabel}
			getValue={getValue}
			{...inputProps}
		/>
		<SuperFieldHint>{hint}</SuperFieldHint>
	</SuperField>
);
SelectField.propTypes = {
	disabled: PropTypes.bool,
	getLabel: PropTypes.func,
	getValue: PropTypes.func,
	hasError: PropTypes.bool,
	hint: PropTypes.node,
	id: PropTypes.string,
	inputProps: PropTypes.object,
	items: PropTypes.array,
	label: PropTypes.node,
	labelAlwaysShrank: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any.isRequired,
};
export default SelectField;
