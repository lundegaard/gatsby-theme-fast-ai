import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cx } from 'ramda-extension';
import MaskedInput from 'react-text-mask';

import FormControl from '../FormControl';

const TextInputControl = forwardRef(
	({ children, className, mask, maskOptions, type = 'text', ...rest }, ref) => {
		const isMasked = maskOptions || mask;

		const component = isMasked ? MaskedInput : 'input';
		const maskProps = isMasked ? { mask, ...maskOptions } : {};

		return (
			<FormControl
				className={cx(className)}
				component={component}
				type={type}
				ref={ref}
				{...maskProps}
				{...rest}
			>
				{children}
			</FormControl>
		);
	}
);

TextInputControl.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	/** Class name for root. */
	className: PropTypes.string,
	mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	maskOptions: PropTypes.shape({
		guide: PropTypes.bool,
		placeholderChar: PropTypes.string,
		keepCharPositions: PropTypes.bool,
		pipe: PropTypes.func,
		showMask: PropTypes.bool,
	}),
	/** HTML type attribute of the input. */
	type: PropTypes.string,
};

export default TextInputControl;
