import React from 'react';
import PropTypes from 'prop-types';
import { isString } from 'ramda-extension';

import Col from '../Col';
import Row from '../Row';
import Box from '../Box';
import Label from '../Label';
import RadioGroup from '../RadioGroup';
import SuperFieldHint from '../SuperFieldHint';

const getVariant = ({ hasError, readOnly, disabled }) => {
	if (hasError) {
		return 'error';
	}
	if (disabled || readOnly) {
		return 'disabled';
	}
};

const RadioGroupField = ({
	children,
	onChange,
	value,
	disabled,
	readOnly,
	hasError,
	hint,
	legend,
	// eslint-disable-next-line react/prop-types,no-unused-vars
	name,
	...rest
}) => (
	<Box
		as="fieldset"
		variant={getVariant({ hasError, readOnly, disabled })}
		sx={{ border: 'none', appearance: 'none', p: 0 }}
	>
		{/* https://stackoverflow.com/questions/28078681/why-cant-fieldset-be-flex-containers */}
		<Row flexWrap="wrap" {...rest}>
			<Col span={[12, 6, 5, 4]} pb={[2, 0]}>
				<Label as="legend" sx={{ width: '100%', p: 0 }}>
					{legend}
				</Label>
			</Col>
			<Col span={[12, 6, 7, 8]}>
				<RadioGroup
					aria-label={isString(legend) ? legend : null}
					onChange={onChange}
					value={value}
					disabled={disabled}
					readOnly={readOnly}
					hasError={hasError}
				>
					{children}
				</RadioGroup>
			</Col>
		</Row>
		<Row>
			<Col span={12}>{hint ? <SuperFieldHint>{hint}</SuperFieldHint> : null}</Col>
		</Row>
	</Box>
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
	/** Called when `onChange` event is triggered on any of children which has `value` prop set. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Current value of the radio group. */
	value: PropTypes.any,
};

export default RadioGroupField;
