import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, ...rest }) => <div {...rest}>{children}</div>;

Label.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
};

export default Label;
