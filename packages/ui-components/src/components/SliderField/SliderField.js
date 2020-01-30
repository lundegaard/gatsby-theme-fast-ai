import React from 'react';
import PropTypes from 'prop-types';

import useGeneratedId from '../../hooks/useGeneratedId';
import Label from '../Label';
import Slider from '../Slider';
import Box from '../Box';
import Text from '../Text';
import SuperFieldHint from '../SuperFieldHint';

const getVariant = ({ hasError, readOnly, disabled }) => {
	if (hasError) {
		return 'error';
	}
	if (disabled || readOnly) {
		return 'disabled';
	}
};

const SliderField = ({
	id: idProp,
	renderValue: Value,
	label,
	hasError,
	disabled,
	readOnly,
	hint,
	value,
	...rest
}) => {
	const generatedStub = useGeneratedId();
	const generatedId = `field-${generatedStub}`;
	const id = idProp || generatedId;
	const variant = getVariant({ hasError, readOnly, disabled });
	return (
		<Box sx={{ position: 'relative' }} variant={variant} pb={2}>
			<Label htmlFor={id}>{label}</Label>
			<Text
				variant={variant ? variant : 'secondary'}
				sx={{ position: 'absolute', color: variant ? null : 'secondary', right: 0, top: 0 }}
			>
				<Value>{value}</Value>
			</Text>
			<Slider
				variant={variant ? `forms.slider.${variant}` : 'forms.slider.default'}
				disabled={disabled}
				readOnly={readOnly}
				id={id}
				value={value}
				{...rest}
			/>
			{hint ? <SuperFieldHint>{hint}</SuperFieldHint> : null}
		</Box>
	);
};

SliderField.propTypes = {
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Error state */
	hasError: PropTypes.bool,
	/** Hint itext */
	hint: PropTypes.node,
	/** Used to connect label and slider. If not defined, component will generate its own. */
	id: PropTypes.string,
	/** Label for Slider  */
	label: PropTypes.node,
	/** Called when `onChange` event is triggered. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Formattting component for the value */
	renderValue: PropTypes.elementType,
	/** Current value of checkbox. */
	value: PropTypes.any,
};

export default SliderField;
