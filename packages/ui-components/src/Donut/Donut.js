import React from 'react';
import PropTypes from 'prop-types';

const Donut = ({ children, ...rest }) => <div {...rest}>{children}</div>;

Donut.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
};

export default Donut;
