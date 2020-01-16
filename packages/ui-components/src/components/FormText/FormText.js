import React from 'react';
import PropTypes from 'prop-types';

const FormText = ({ children, ...rest }) => <div {...rest}>{children}</div>;

FormText.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
};

export default FormText;
