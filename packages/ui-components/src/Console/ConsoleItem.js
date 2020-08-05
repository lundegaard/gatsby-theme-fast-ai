import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import { FormattedNumber } from 'gatsby-theme-fast-ai';
import { keyframes } from '@emotion/core';
import Dotdotdot from 'react-dotdotdot';

import Box from '../Box';
import Flex from '../Flex';

const backgroundFadeout = keyframes`
	0% {
		background-color: rgba(255, 0, 0, 1);
	}
	100% {
		background-color: rgba(255, 0, 0, 0);
	}
`;

const HighlightChangesText = ({ ...rest }) => (
	<Box
		{...rest}
		sx={{
			animationName: backgroundFadeout,
			animationDuration: '1.5s',
			animationTimingFunction: 'ease-out',
			animationFillMode: 'both',
		}}
	/>
);

const ConsoleItem = ({ value, label, ...rest }) => (
	<Flex sx={{ py: 2, px: 3, alignItems: 'center' }} {...rest}>
		<Box as="span" fontSize={1} mb={0}>
			{label}
		</Box>
		<HighlightChangesText title={value} key={value} as="span" ml="auto" mb={0} fontSize={1}>
			<Dotdotdot clamp={1}>{value}</Dotdotdot>
		</HighlightChangesText>
	</Flex>
);

ConsoleItem.propTypes = {
	label: PropTypes.string,
	value: PropTypes.any,
};

export default memo(ConsoleItem);
