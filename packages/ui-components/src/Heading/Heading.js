import React from 'react';
import PropTypes from 'prop-types';
import { Heading as RebassHeading } from 'rebass';
import { T, always, cond, equals } from 'ramda';
import { alwaysEmptyObject } from 'ramda-extension';

const resolveDefaultProps = cond([
	[equals('h1'), always({ fontSize: [7, 8, 9], mb: [5, 6] })],
	[equals('h2'), always({ fontSize: [3, 4, 7], mb: 3, mt: [2, 3] })],
	[equals('h3'), always({ fontSize: [4, 5, 6], mb: 2, mt: [2, 3] })],
	[equals('h4'), always({ fontSize: [4, 5, 6], mb: 1 })],
	[T, alwaysEmptyObject],
]);

const Heading = ({ as = 'h1', ...rest }) => (
	<RebassHeading
		as={as}
		fontFamily="heading"
		fontWeight="800"
		{...resolveDefaultProps(as)}
		{...rest}
	/>
);

Heading.propTypes = {
	as: PropTypes.string,
};

export default Heading;
