import React, { forwardRef } from 'react';
import { Box as RebassBox } from 'rebass';

const Box = forwardRef((props, ref) => <RebassBox ref={ref} {...props} />);
Box.displayName = 'Box';

export default Box;
