import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Text from '../Text';

const DevConsoleItem = ({ value, label, ...rest }) => (
	<Flex sx={{ py: 2, px: 3, alignItems: 'center' }} {...rest}>
		<Text as="span" fontSize={1} mb={0}>
			{label}
		</Text>
		<Text as="span" ml="auto" mb={0} fontSize={1}>
			{value}
		</Text>
	</Flex>
);

DevConsoleItem.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
};

export default DevConsoleItem;
