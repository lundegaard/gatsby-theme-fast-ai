import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';

import { components } from '../mdxComponents';

import Page from './Page';

const MdxPage = ({ children }) => (
	<MDXProvider components={components}>
		<Page>{children}</Page>
	</MDXProvider>
);

MdxPage.propTypes = { children: PropTypes.node };

export default MdxPage;
