import React from 'react';
import PropTypes from 'prop-types';

import useGeneratedId from '../../hooks/useGeneratedId';
import Slider from '../Slider';
import Text from '../Text';
import Box from '../Box';
import FormGroup, { getVariant } from '../FormGroup';

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
	const variant = getVariant({ disabled, readOnly, hasError });

	return (
		<Box sx={{ position: 'relative' }}>
			<Text
				sx={{
					textAlign: 'right',
					position: ['absolute', 'absolute', 'static'],
					right: 0,
					top: 0,
				}}
				mb={0}
			>
				{Value ? <Value>{value}</Value> : value}
			</Text>
			<FormGroup
				id={id}
				label={label}
				hint={hint}
				disabled={disabled}
				readOnly={readOnly}
				hasError={hasError}
			>
				<Slider
					variant={variant ? `forms.slider.${variant}` : 'forms.slider.default'}
					disabled={disabled}
					readOnly={readOnly}
					id={id}
					value={value}
					{...rest}
				/>
			</FormGroup>
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
