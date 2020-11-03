import React, { forwardRef } from 'react';
import { Link as RebassLink } from 'rebass';

const Link = forwardRef((props, ref) => <RebassLink ref={ref} {...props} />);
Link.displayName = 'Link';

export default Link;
