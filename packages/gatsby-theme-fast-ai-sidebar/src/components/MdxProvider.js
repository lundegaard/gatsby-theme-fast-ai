import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { components } from '../mdxComponents';

const MdxProvider = props => <MDXProvider components={components} {...props} />;

export default MdxProvider;
