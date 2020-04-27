import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Viewport = ({ children }) => (
	<Helmet>
		<meta
			name="viewport"
			content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
		/>
		{children}
	</Helmet>
);

Viewport.propTypes = {
	children: PropTypes.node,
	theme: PropTypes.object,
};

export default Viewport;
