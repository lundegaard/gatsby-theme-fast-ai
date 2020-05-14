import React from 'react';
import PropTypes from 'prop-types';
import { Heading as RebassHeading } from 'rebass';

const Heading = ({ as = 'h1', ...rest }) => <RebassHeading as={as} {...rest} />;

Heading.propTypes = {
	as: PropTypes.string,
};

export default Heading;
