import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Radio as RebassRadio } from '@rebass/forms';

import Label from '../Label';

const Radio = forwardRef(
	({ label, disabled, readOnly, name, value, onChange, checked, ...rest }, ref) => (
		<Label ref={ref} color="inherit" alignItems="center" {...rest}>
			<RebassRadio
				name={name}
				value={value}
				disabled={disabled}
				checked={checked}
				readOnly={readOnly}
				onChange={onChange}
			/>
			{label}
		</Label>
	)
);
Radio.displayName = 'Radio';

Radio.propTypes = {
	checked: PropTypes.bool,
	/** Disabled state */
	disabled: PropTypes.bool,
	/** Label for Radio  */
	label: PropTypes.node,
	name: PropTypes.string,
	/** Called when `onChange` event is triggered. */
	onChange: PropTypes.func,
	/** Read-only state */
	readOnly: PropTypes.bool,
	/** Current value of the radio. */
	value: PropTypes.any,
};

export default Radio;
