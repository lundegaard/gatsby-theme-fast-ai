import React, { forwardRef } from 'react';
import { Text as RebassText } from 'rebass';

const Text = forwardRef((props, ref) => (
	<RebassText ref={ref} variant="body" {...props} />
));

Text.displayName = 'Text';

export default Text;
