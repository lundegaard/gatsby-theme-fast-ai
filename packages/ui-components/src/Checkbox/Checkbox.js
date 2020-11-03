import React, { forwardRef } from 'react';
import { Checkbox as RebassCheckbox } from '@rebass/forms';

const Checkbox = forwardRef((props, ref) => (
	<RebassCheckbox ref={ref} {...props} />
));
Checkbox.displayName = 'Checkbox';

export default Checkbox;
