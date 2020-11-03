import React, { forwardRef } from 'react';

import Text from '../Text';

const MonospacedText = forwardRef((props, ref) => (
	<Text fontFamily="mono" letterSpacing="mono" ref={ref} {...props} />
));
MonospacedText.displayName = 'MonospacedText';

export default MonospacedText;
