import React from 'react';
import PropTypes from 'prop-types';

import Col from '../Col';
import Row from '../Row';
import Box from '../Box';
import Label from '../Label';
import SuperFieldHint from '../SuperFieldHint';

export const getVariant = ({ hasError, readOnly, disabled }) => {
	if (hasError) {
		return 'danger';
	}
	if (disabled || readOnly) {
		return 'disabled';
	}
};

const FormGroup = ({
	children,
	disabled,
	readOnly,
	hasError,
	hint,
	legend,
	label,
	id,
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
		<Row flexWrap="wrap" alignItems="center" justifyContent="center" {...rest}>
			<Col span={[12, 12, 5, 4]} pb={[2, 2, 0]}>
				<Label
					htmlFor={legend ? void 0 : id}
					as={legend ? 'legend' : 'label'}
					sx={{ width: '100%', p: 0 }}
				>
					{legend || label}
				</Label>
			</Col>
			<Col span={[12, 12, 7, 8]}>{children}</Col>
		</Row>
		<Row>
			<Col span={12}>
				{hint ? <SuperFieldHint>{hint}</SuperFieldHint> : null}
			</Col>
		</Row>
	</Box>
);

FormGroup.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Error state */
	hasError: PropTypes.bool,
	hint: PropTypes.node,
	id: PropTypes.string,
	label: PropTypes.node,
	legend: PropTypes.node,
	/** Read-only state */
	readOnly: PropTypes.bool,
};

export default FormGroup;
