import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/core';

import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';

import DevConsoleItem from './DevConsoleItem';
import { useDevConsoleLog } from './hooks';

const jumpInFromBottom = keyframes`
	0% {
		transform: translateY(200px) scaleY(2.5) scaleX(.2);
		transform-origin: 50% 0%;
		filter: blur(40px);
		opacity: 0;
	}
	100% {
		transform: translateY(0) scaleY(1) scaleX(1);
		transform-origin: 50% 50%;
		filter: blur(0);
		opacity: 1;
	}
}
`;

const easing = 'cubic-bezier(.455, .030, .515, .955)';

/* eslint-disable max-len */
const DropdownArrow = props => (
	<Box
		as="svg"
		width="13px"
		height="9px"
		viewBox="0 0 13 9"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<polygon
			fill="currentColor"
			points="10 1.03916875e-13 11.4061556 1.42222591 5.70307778 7.06086213 0 1.42222591 1.40615556 1.03916875e-13 5.70307778 4.24811295"
		/>
	</Box>
);
/* eslint-enable max-len */

const DevConsole = ({ title, initiallyOpened, ...rest }) => {
	const [isOpened, setIsOpened] = useState(initiallyOpened);
	const log = useDevConsoleLog();

	return (
		<Box
			sx={{
				position: 'fixed',
				right: '0',
				bottom: 0,
				animationName: jumpInFromBottom,
				animationDuration: '.5s',
				animationTimingFunction: easing,
				animationFillMode: 'both',
				animationDelay: '.75s',
				backgroundColor: '#3B3B3B',
				color: 'background',
				maxHeight: '100vh',
				minWidth: ['auto', '400px'],
				width: ['100%', '33%'],
			}}
			{...rest}
		>
			<Flex
				sx={{ py: 2, px: 3, alignItems: 'center', cursor: 'pointer' }}
				onClick={() => setIsOpened(!isOpened)}
			>
				<Text as="span" fontFamily="mono" fontSize={1} my={0} sx={{ pointerEvents: 'none' }}>
					{title}
				</Text>
				<DropdownArrow
					sx={{
						marginLeft: 'auto',
						display: 'inline',
						transform: `rotate(${isOpened ? '0' : '180'}deg)`,
					}}
				/>
			</Flex>

			{isOpened && (
				<Box
					sx={{
						borderTopColor: 'background',
						overflowY: 'auto',
						height: '300px',
						borderTopStyle: 'solid',
						borderTopWidth: '1px',
					}}
				>
					{log.map(([label, value], i) => (
						<DevConsoleItem key={i} label={label} value={value} />
					))}
				</Box>
			)}
		</Box>
	);
};

DevConsole.propTypes = {
	children: PropTypes.node,
	initiallyOpened: PropTypes.bool,
	title: PropTypes.node,
};

export default DevConsole;
