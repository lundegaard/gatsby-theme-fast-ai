import React, { forwardRef } from 'react';
import { Label as RebassLabel } from '@rebass/forms';

const Label = forwardRef((props, ref) => <RebassLabel ref={ref} fontSize={2} {...props} />);

Label.displayName = 'Label';

export default Label;
