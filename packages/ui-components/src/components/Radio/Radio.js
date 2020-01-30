import React from 'react';
import PropTypes from 'prop-types';
import { Radio as RebassRadio } from '@rebass/forms';

import Label from '../Label';

const Radio = ({ label, disabled, readOnly, ...rest }) => (
	<Label color="inherit" fontSize={1} alignItems="center" {...rest}>
		<RebassRadio {...rest} disabled={disabled} readOnly={readOnly} />
		{label}
	</Label>
);

Radio.propTypes = {
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Label for Radio  */
	label: PropTypes.node,
	/** Called when `onChange` event is triggered. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Current value of the radio. */
	value: PropTypes.any,
};

export default Radio;
