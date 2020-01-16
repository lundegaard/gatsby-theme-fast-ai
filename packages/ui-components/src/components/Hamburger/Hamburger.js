import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Box from '../Box';

const Hamburger = ({ isOpen, ...rest }) => (
	<Flex
		sx={{
			transition: 'background-color .25s ease-in',
			backgroundColor: isOpen ? 'primary' : 'transparent',
			height: 64,
			width: 64,
			alignItems: 'center',
			justifyContent: 'center',
			cursor: 'pointer',
		}}
		{...rest}
	>
		<Box
			sx={{
				position: 'relative',
				width: '24px',
				height: '18px',
				transform: 'rotate(0deg)',
				transition: '.3s ease-in-out',

				span: {
					display: 'block',
					position: 'absolute',
					height: '2px',
					width: '100%',
					backgroundColor: 'primary',
					opacity: 1,
					transform: 'translateX(0)',
					transition: 'transform .25s ease-in, opacity .25s ease-in',
				},

				'span:nth-child(1)': {
					top: 0,
					...(isOpen
						? {
								backgroundColor: 'white',
								transform: 'translateX(200%)',
								opacity: 0,
						  }
						: {}),
				},

				'span:nth-child(2)': {
					top: 'calc(( 100% / 2 ) - 1px )',
					...(isOpen
						? {
								transform: 'rotate(-45deg)',
								backgroundColor: 'white',
						  }
						: {}),

					'&:after': {
						content: '""',
						display: 'block',
						position: 'absolute',
						height: '2px',
						width: '100%',
						backgroundColor: 'primary',
						opacity: 0,
						left: 0,
						transform: 'rotate(0) translateX(0)',
						transition: 'opacity .25s ease-in, transform .25s ease-in',
						...(isOpen
							? {
									transform: 'rotate(90deg)',
									opacity: 1,
									backgroundColor: 'white',
							  }
							: {}),
					},
				},

				'span:nth-child(3)': {
					bottom: 0,
					...(isOpen
						? {
								backgroundColor: 'white',
								transform: 'translateX(200%)',
								opacity: 0,
						  }
						: {}),
				},
			}}
		>
			<span />
			<span />
			<span />
		</Box>
	</Flex>
);

Hamburger.propTypes = { isOpen: PropTypes.bool };

export default Hamburger;
