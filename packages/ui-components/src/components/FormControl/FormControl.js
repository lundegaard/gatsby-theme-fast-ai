import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { cx, equalsEmptyString, isArray, isNotNil, noop } from 'ramda-extension';
import invariant from 'invariant';
import { anyPass, both, complement, either, isEmpty, isNil } from 'ramda';

import { FormGroupContext } from '../../contexts';

const isNotFilled = anyPass([either(isNil, equalsEmptyString), both(isArray, isEmpty)]);
const isFilled = complement(isNotFilled);

class FormControl extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.inputRef = props.inputRef || createRef();

		const { onFilled } = this.context;

		if (isFilled(props.value)) {
			onFilled();
		}

		this.prevValue = null;
	}

	getSnapshotBeforeUpdate(prevProps) {
		this.prevValue = prevProps.value;

		return null;
	}

	componentDidUpdate() {
		const { value } = this.props;
		const { onFilled, onEmpty } = this.context;

		if (isNotFilled(this.prevValue) && isFilled(value)) {
			onFilled();
		}

		if (isFilled(this.prevValue) && isNotFilled(value)) {
			onEmpty();
		}
	}

	static contextType = FormGroupContext;

	handleFocus = e => {
		const { onFocus } = this.props;
		this.context.onFocus();

		return onFocus(e);
	};

	handleBlur = e => {
		const { onBlur } = this.props;
		this.context.onBlur();

		return onBlur(e);
	};

	getInputRef() {
		return this.inputRef;
	}

	render() {
		const {
			checked,
			children,
			className,
			component: Component,
			name,
			controlSize,
			type,
			value,
			// eslint-disable-next-line no-unused-vars
			inputRef,
			...otherProps
		} = this.props;

		const { hasError, hasFloatingLabel } = this.context;

		const isCheckable = ['radio', 'checkbox'].includes(type) || isNotNil(checked);

		invariant(
			isCheckable || !hasFloatingLabel || value !== undefined,
			`FormControl with name "${name}" must be a controlled component. ` +
				'This is necessary for floating labels to function properly.'
		);

		return (
			<Component
				checked={checked}
				className={cx(className, 'form-control', controlSize && `form-control-${controlSize}`, {
					'is-invalid': hasError,
				})}
				name={name}
				type={type}
				value={value}
				ref={this.inputRef}
				{...otherProps}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
			>
				{children}
			</Component>
		);
	}
}

FormControl.propTypes = {
	/** Checked attribute of the form control. */
	checked: PropTypes.bool,
	/** Children to be rendered in the main container. */
	children: PropTypes.node,
	/** Class name for root. */
	className: PropTypes.string,
	/** Component used as form control. */
	component: PropTypes.elementType.isRequired,
	/** Size of the form control. */
	controlSize: PropTypes.oneOf(['sm', 'lg']),
	/** This prop can be used to pass a ref callback to the input element. */
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/** Name of the form control. */
	name: PropTypes.string.isRequired,
	/** Function to call when the form control emits a `blur` event. */
	onBlur: PropTypes.func,
	/** Function to call when the form control emits a `focus` event. */
	onFocus: PropTypes.func,
	/** Type attribute of the form control. */
	type: PropTypes.string,
	/** Value of the form control. */
	value: PropTypes.any,
};

FormControl.defaultProps = {
	onBlur: noop,
	onFocus: noop,
};

export { FormControl };
export default FormControl;
