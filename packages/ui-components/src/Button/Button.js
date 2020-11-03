import React, { forwardRef } from 'react';
import { Button as RebassButton } from 'rebass';

const Button = forwardRef((props, ref) => (
	<RebassButton ref={ref} {...props} />
));
Button.displayName = 'Button';

export default Button;
