import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import TextInputControl from '../TextInputControl';
import FormField from '../FormField';

const TextInput = forwardRef(({ hasFloatingLabel, ...otherProps }, ref) => (
	<FormField
		ref={ref}
		control={TextInputControl}
		hasFloatingLabel={hasFloatingLabel}
		kind="text-input"
		autoComplete="off"
		{...otherProps}
	/>
));

TextInput.displayName = 'forwardRef(TextInput)';

TextInput.propTypes = {
	hasFloatingLabel: PropTypes.bool,
};

export default TextInput;
