import React from 'react';
import PropTypes from 'prop-types';
import { Heading as RebassHeading } from 'rebass';
import { T, always, cond, equals } from 'ramda';
import { alwaysEmptyObject } from 'ramda-extension';

const resolveDefaultProps = cond([
	[equals('h1'), always({ fontSize: [8, 9], mb: [5, 6] })],
	[equals('h2'), always({ fontSize: [4, 7], mb: 3, mt: [4, 5] })],
	[equals('h3'), always({ fontSize: [5, 6], mb: 2 })],
	[T, alwaysEmptyObject],
]);

const Heading = ({ as = 'h1', ...rest }) => (
	<RebassHeading as={as} fontFamily="heading" {...resolveDefaultProps(as)} {...rest} />
);

Heading.propTypes = {
	as: PropTypes.string,
};

export default Heading;
