import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cx } from 'ramda-extension';

import Box from '../Box';
import { FormGroupContext } from '../../contexts';

class FormGroup extends Component {
	state = {
		isFilled: false,
		isFocused: false,
	};

	handleFocus = () => this.setState(state => (!state.isFocused ? { isFocused: true } : null));
	handleBlur = () => this.setState(state => (state.isFocused ? { isFocused: false } : null));
	handleEmpty = () => this.setState(state => (state.isFilled ? { isFilled: false } : null));
	handleFill = () => this.setState(state => (!state.isFilled ? { isFilled: true } : null));

	render() {
		const {
			children,
			className,
			hasError,
			hasFloatingLabel,
			hasLabel,
			hasWarning,
			kind,
			legendText,
			inline,
			...otherProps
		} = this.props;

		const { isFilled, isFocused } = this.state;

		const contextValue = {
			onFocus: this.handleFocus,
			onBlur: this.handleBlur,
			onEmpty: this.handleEmpty,
			onFilled: this.handleFill,
			isFilled,
			isFocused,
			hasError,
			hasFloatingLabel,
			hasLabel,
		};

		return (
			<FormGroupContext.Provider value={contextValue}>
				<Box
					{...otherProps}
					className={cx(
						'form-group',
						kind && `form-group--${kind}`,
						legendText && 'with-legend',
						inline && 'inline',
						{
							'floating-label': hasFloatingLabel,
							'has-error': hasError,
							'has-warning': hasWarning && !hasError,
							'has-success': !hasWarning && !hasError,
							'is-filled': isFilled,
							'is-focused': isFocused,
							'without-label': !hasLabel,
						},
						className
					)}
				>
					{children}
				</Box>
			</FormGroupContext.Provider>
		);
	}
}

FormGroup.propTypes = {
	/** Children to be rendered in the main container. */
	children: PropTypes.node.isRequired,
	/** Class name for root. */
	className: PropTypes.string,
	/** If `true`, form field is in error state. `hasWarning` is ignored */
	hasError: PropTypes.bool,
	/** If `true`, the form group includes a floating label. */
	hasFloatingLabel: PropTypes.bool,
	/** If `true`, the form group includes a label. */
	hasLabel: PropTypes.bool,
	/** If `true`, form field is in warning state. If `hasError` is set, property is ignored. */
	hasWarning: PropTypes.bool,
	/** If `true`, label is absolutely positioned on the right side of the form group. */
	inline: PropTypes.bool,
	/** ClassName used to style nested elements (labels and form controls). */
	kind: PropTypes.string,
	/** Legend inside text input. */
	legendText: PropTypes.string,
};

export default FormGroup;
