import React, { forwardRef } from 'react';
import { Image as RebassImage } from 'rebass';

const Image = forwardRef((props, ref) => <RebassImage ref={ref} {...props} />);
Image.displayName = 'Image';

export default Image;
