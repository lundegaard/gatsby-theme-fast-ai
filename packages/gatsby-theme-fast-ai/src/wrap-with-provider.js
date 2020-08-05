import React from 'react';
import PropTypes from 'prop-types';

import Layout from './components/Layout';
import theme from './theme';

const wrapWithProvider = ({ element }) => (
	<Layout theme={theme}>{element}</Layout>
);
wrapWithProvider.propTypes = { element: PropTypes.node };

export default wrapWithProvider;
