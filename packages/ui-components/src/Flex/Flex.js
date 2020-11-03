import React, { forwardRef } from 'react';
import { Flex as RebassFlex } from 'rebass';

const Flex = forwardRef((props, ref) => <RebassFlex ref={ref} {...props} />);

Flex.displayName = 'Flex';

export default Flex;
