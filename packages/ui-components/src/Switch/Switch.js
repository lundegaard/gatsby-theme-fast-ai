import React, { Fragment, forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const GUTTER = 2;
const SIZE = 18;

const Switch = forwardRef(
	({ className, label, sx, variant = 'switch', ...rest }, ref) => (
		<Fragment>
			<Box
				ref={ref}
				as="input"
				type="checkbox"
				aria-label={label}
				{...rest}
				sx={{
					position: 'absolute',
					opacity: 0,
					zIndex: -1,
					width: 1,
					height: 1,
					overflow: 'hidden',
				}}
			/>
			<Box
				css={{ padding: GUTTER }}
				variant={variant}
				className={className}
				sx={{
					...sx,
					position: 'relative',
					flexShrink: 0,
					bg: 'body',
					borderRadius: SIZE,
					height: SIZE + GUTTER * 2,
					width: SIZE * 2 + GUTTER * 2,
					mr: 2,
					'input:disabled ~ &': {
						opacity: 0.5,
						cursor: 'not-allowed',
					},
					'& > div': {
						display: 'flex',
						alignItems: 'center',
						borderRadius: '50%',
						height: SIZE,
						width: SIZE,
						bg: 'white',
						boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
						position: 'relative',
						transform: 'translateX(0%)',
						transition:
							'transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)',
					},
					'input:checked ~ &': {
						bg: 'primary',
						borderColor: 'primary',
						'> div': {
							transform: 'translateX(100%)',
						},
					},
				}}
			>
				<Box />
			</Box>
		</Fragment>
	),
);
Switch.displayName = 'Switch';
Switch.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	variant: PropTypes.string,
};

export default Switch;
