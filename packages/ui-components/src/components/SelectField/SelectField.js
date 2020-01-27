import React, { forwardRef, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/core';
import { Select as RebassSelect } from '@rebass/forms';
import { identity, map, o, prepend, prop } from 'ramda';
import { isFunction, noop } from 'ramda-extension';

import useBlockingEffect from '../../hooks/useBlockingEffect';
import SuperField, { Hint, Label, isInputValueEmpty, useSuperFieldContext } from '../SuperField';
import Box from '../Box';

// NOTE: make sure, that contents of `autofill` and `autofillCancel` are not the same. Otherwise emotion actually assings both of them same animation.name.
const autofillCancel = keyframes`
	from {}
	to: {}
`;

const Select = forwardRef(
	(
		{
			value,
			onChange,
			onFocus: onFocusProp = () => {},
			onBlur: onBlurProp = () => {},
			placeholder,
			disabled,
			readOnly,
			items,
			getLabel = prop('label'),
			getValue = prop('value'),
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
				<RebassSelect
					sx={{
						color: 'inherit',
						border: 'none',
						WebkitTapHighlightColor: 'transparent',
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
					disabled={disabled}
					readOnly={readOnly}
					ref={ref}
					{...rest}
				>
					{o(
						placeholder
							? prepend(
									<option key="" disabled value="">
										{placeholder}
									</option>
							  )
							: identity,
						map(item => (
							<option key={getValue(item)} value={getValue(item)}>
								{getLabel(item)}
							</option>
						))
					)(items)}
				</RebassSelect>
			</Box>
		);
	}
);
Select.displayName = 'Select';
Select.propTypes = {
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any.isRequired,
};

/**
 * Convenient component for most of the SelectFields. But with SuperField is simple to compose its own.
 * It just specified that this is a input field, that can have an error, hint, prefix or suffix.
 */
export const SelectField = ({
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
	getLabel,
	getValue,
	items,
	...rest
}) => (
	<SuperField {...rest} disabled={disabled} readOnly={readOnly} hasError={hasError} id={id}>
		<Label alwaysShrank={labelAlwaysShrank || placeholder}>{label}</Label>
		<Select
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={onChange}
			disabled={disabled}
			readOnly={readOnly}
			items={items}
			getLabel={getLabel}
			getValue={getValue}
			{...inputProps}
		/>
		<Hint>{hint}</Hint>
	</SuperField>
);
SelectField.propTypes = {
	disabled: PropTypes.bool,
	getLabel: PropTypes.func,
	getValue: PropTypes.func,
	hasError: PropTypes.bool,
	hint: PropTypes.node,
	id: PropTypes.string,
	inputProps: PropTypes.object,
	items: PropTypes.array,
	label: PropTypes.node,
	labelAlwaysShrank: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any.isRequired,
};
export default SelectField;
