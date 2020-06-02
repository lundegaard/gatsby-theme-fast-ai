import React from 'react';
import PropTypes from 'prop-types';

import MdxProvider from '../components/MdxProvider';

import Page from './Page';

const MdxPage = ({ children }) => (
	<MdxProvider>
		<Page>{children}</Page>
	</MdxProvider>
);

MdxPage.propTypes = { children: PropTypes.node };

export default MdxPage;
