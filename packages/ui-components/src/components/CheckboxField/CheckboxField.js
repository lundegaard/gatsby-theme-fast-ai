import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import Checkbox from '../Checkbox';
import Box from '../Box';
import SuperFieldHint from '../SuperFieldHint';

const getVariant = ({ hasError, readOnly, disabled }) => {
	if (hasError) {
		return 'error';
	}
	if (disabled || readOnly) {
		return 'disabled';
	}
};

const CheckboxField = ({ label, hasError, disabled, readOnly, hint, ...rest }) => (
	<Box variant={getVariant({ hasError, readOnly, disabled })} pb={2}>
		<Label fontSize={1} alignItems="center">
			<Checkbox {...rest} />
			{label}
		</Label>
		{hint ? <SuperFieldHint>{hint}</SuperFieldHint> : null}
	</Box>
);

CheckboxField.propTypes = {
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Error state */
	hasError: PropTypes.bool,
	/** Hint itext */
	hint: PropTypes.node,
	/** Label for Checkbox  */
	label: PropTypes.node,
	/** Called when `onChange` event is triggered. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Current value of checkbox. */
	value: PropTypes.any,
};

export default CheckboxField;
