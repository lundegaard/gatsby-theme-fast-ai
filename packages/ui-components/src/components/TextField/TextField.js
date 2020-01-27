import React, { forwardRef, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/core';
import { Input as RebassInput } from '@rebass/forms';
import { isFunction, noop } from 'ramda-extension';

import useBlockingEffect from '../../hooks/useBlockingEffect';
import SuperField, { Hint, Label, isInputValueEmpty, useSuperFieldContext } from '../SuperField';
import Box from '../Box';

const placeholderHidden = {
	opacity: '0 !important',
};
const placeholderVisible = {
	opacity: 0.5,
};

const mergeRefs = refs => value => {
	refs.filter(Boolean).forEach(ref => (isFunction(ref) ? ref(value) : (ref.current = value)));
};

const autofill = keyframes`
	from {}
`;

// NOTE: make sure, that contents of `autofill` and `autofillCancel` are not the same. Otherwise emotion actually assings both of them same animation.name.
const autofillCancel = keyframes`
	from {}
	to: {}
`;

const Input = forwardRef(
	(
		{
			value,
			onChange,
			onFocus: onFocusProp = () => {},
			onBlur: onBlurProp = () => {},
			placeholder,
			disabled,
			readOnly,
			...rest
		},
		ref
	) => {
		const {
			id,
			isLabelShrank,
			hasError,
			onFill,
			onEmpty,
			onFocus,
			onBlur,
		} = useSuperFieldContext();
		const inputRef = useRef();
		const internalInputRef = mergeRefs([inputRef, ref]);

		const checkDirty = useCallback(
			value => {
				if (isInputValueEmpty(value)) {
					onEmpty();
				} else {
					onFill();
				}
			},
			[onEmpty, onFill]
		);

		useBlockingEffect(() => {
			checkDirty(value);
		}, [checkDirty, value]);

		const handleAutoFill = event => {
			// Provide a fake value as Chrome might not let you access it for security reasons.
			checkDirty(
				event.animationName.indexOf(autofillCancel.name) !== -1 ? inputRef.current.value : 'x'
			);
		};

		return (
			<Box
				sx={{
					position: 'relative',
					'&:before': {
						content: '"\u00a0"',
						display: 'block',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						borderBottomStyle: 'solid',
						borderBottomWidth: '1px',
						borderBottomColor: 'lightGray',
						pointerEvents: 'none',
					},
					'&:hover:before': {
						borderBottomColor: disabled ? 'lightGray' : 'gray',
					},
					'&:after': {
						content: '"\u00a0"',
						display: 'block',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						borderBottomStyle: 'solid',
						borderBottomWidth: disabled || readOnly ? '1px' : '2px',
						borderBottomColor: (() => {
							if (hasError) {
								return 'danger';
							} else if (disabled || readOnly) {
								return 'lightGray';
							} else {
								return 'secondary';
							}
						})(),
						pointerEvents: 'none',
						transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
						transform: !isLabelShrank && !hasError ? 'scaleX(0)' : '',
					},
				}}
			>
				<RebassInput
					sx={{
						color: 'inherit',
						border: 'none',
						animationDuration: '50000s',
						'&:not(:-webkit-autofill)': {
							animationName: autofillCancel,
							animationDuration: '50000s',
						},
						'&:-webkit-autofill': {
							animationName: autofill,
							animationDuration: '50000s',
						},
						WebkitTapHighlightColor: 'transparent',
						'&::placeholder': placeholder,
						'&::WebkitSearchDecoration': {
							// Remove the padding when type=search.
							WebkitAppearance: 'none',
						},
						...(!isLabelShrank
							? {
									'&::placeholder': placeholderHidden,
							  }
							: {
									'&:placeholder': placeholderVisible,
							  }),
						// FF
						'&:invalid': {
							boxShadow: 'none',
						},
						'&:focus': {
							outline: 0,
						},
						width: '100%',
					}}
					px={0}
					id={id}
					onAnimationStart={handleAutoFill}
					value={value}
					onChange={disabled ? noop : onChange}
					onFocus={event => {
						if (disabled) {
							return;
						}
						onFocus();
						return onFocusProp(event);
					}}
					onBlur={event => {
						if (disabled) {
							return;
						}
						onBlur();
						return onBlurProp(event);
					}}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					ref={internalInputRef}
					{...rest}
				/>
			</Box>
		);
	}
);
Input.displayName = 'Input';
Input.propTypes = {
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any.isRequired,
};

/**
 * Convenient component for most of the TextFields. But with SuperField is simple to compose its own.
 * It just specified that this is a input field, that can have an error, hint, prefix or suffix.
 */
export const TextField = ({
	id,
	label,
	hasError,
	hint,
	onChange,
	value,
	name,
	disabled,
	readOnly,
	placeholder,
	inputProps,
	labelAlwaysShrank,
	...rest
}) => (
	<SuperField {...rest} disabled={disabled} readOnly={readOnly} hasError={hasError} id={id}>
		<Label alwaysShrank={labelAlwaysShrank}>{label}</Label>
		<Input
			type="text"
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={onChange}
			disabled={disabled}
			readOnly={readOnly}
			{...inputProps}
		/>
		<Hint>{hint}</Hint>
	</SuperField>
);
TextField.propTypes = {
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	hint: PropTypes.node,
	id: PropTypes.string,
	inputProps: PropTypes.object,
	label: PropTypes.node,
	labelAlwaysShrank: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any.isRequired,
};
export default TextField;
