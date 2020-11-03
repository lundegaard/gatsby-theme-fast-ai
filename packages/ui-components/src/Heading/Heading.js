import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Heading as RebassHeading } from 'rebass';

const Heading = forwardRef(({ as = 'h1', ...rest }, ref) => (
	<RebassHeading ref={ref} as={as} {...rest} />
));

Heading.displayName = 'Heading';
Heading.propTypes = {
	as: PropTypes.string,
};

export default Heading;
