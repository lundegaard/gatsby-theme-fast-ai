import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Box from '../Box';

const Hamburger = forwardRef(({ isOpen, ...rest }, ref) => (
	<Flex
		ref={ref}
		sx={{
			variant: isOpen ? 'hamburger.opened' : 'hamburger.closed',
			transition: 'background-color .25s ease-in',
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
				variant: isOpen ? 'hamburgerInner.opened' : 'hamburgerInner.closed',
				position: 'relative',
				width: '24px',
				height: '18px',
				transform: 'rotate(0deg)',
				transition: '.3s ease-in-out',
				span: {
					variant: isOpen ? 'hamburgerBar.opened' : 'hamburgerBar.closed',
					display: 'block',
					position: 'absolute',
					height: '2px',
					width: '100%',
					opacity: 1,
					transform: 'translateX(0)',
					transition: 'transform .25s ease-in, opacity .25s ease-in',
				},

				'span:nth-of-type(1)': {
					variant: 'hamburgerBar.closed',
					top: 0,
					...(isOpen
						? {
								transform: 'translateX(200%)',
								variant: 'hamburgerBar.opened',
								opacity: 0,
						  }
						: {}),
				},

				'span:nth-of-type(2)': {
					variant: 'hamburgerBar.closed',
					top: 'calc(( 100% / 2 ) - 1px )',
					...(isOpen
						? {
								variant: 'hamburgerBar.opened',
								transform: 'rotate(-45deg)',
						  }
						: {}),

					'&:after': {
						variant: 'hamburgerBar.closed',
						content: '""',
						display: 'block',
						position: 'absolute',
						height: '2px',
						width: '100%',
						opacity: 0,
						left: 0,
						transform: 'rotate(0) translateX(0)',
						transition: 'opacity .25s ease-in, transform .25s ease-in',
						...(isOpen
							? {
									variant: 'hamburgerBar.opened',
									transform: 'rotate(90deg)',
									opacity: 1,
							  }
							: {}),
					},
				},

				'span:nth-of-type(3)': {
					variant: 'hamburgerBar.closed',
					bottom: 0,
					...(isOpen
						? {
								variant: 'hamburgerBar.opened',
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
));

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = { isOpen: PropTypes.bool };

export default Hamburger;
