import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ children, ...rest }) => <div {...rest}>{children}</div>;

Icon.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
};

export default Icon;
