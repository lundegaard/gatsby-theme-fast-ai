import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Select as RebassSelect } from '@rebass/forms';
import { identity, map, o, prepend, prop } from 'ramda';
import { noop } from 'ramda-extension';

import useBlockingEffect from '../../hooks/useBlockingEffect';
import { isInputValueEmpty, useSuperFieldContext } from '../SuperField';
import Box from '../Box';

const getBorderColor = ({ hasError, disabled, readOnly }) => {
	if (hasError) {
		return 'danger';
	} else if (disabled || readOnly) {
		return 'lightGray';
	} else {
		return 'secondary';
	}
};

// TODO: items -> children - Option/OptionGroup
const Select = forwardRef((props, ref) => {
	const {
		value,
		onChange,
		onFocus: onFocusProp = noop,
		onBlur: onBlurProp = noop,
		placeholder,
		disabled,
		readOnly,
		items = [],
		getLabel = prop('label'),
		getValue = prop('value'),
		...rest
	} = props;
	const { id, isLabelShrank, hasError, onFill, onEmpty, onFocus, onBlur } = useSuperFieldContext();

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

	const handleChange = disabled ? noop : onChange;

	const handleFocus = event => {
		if (disabled) {
			return;
		}
		onFocus();
		return onFocusProp(event);
	};

	const handleBlur = event => {
		if (disabled) {
			return;
		}
		onBlur();
		return onBlurProp(event);
	};

	const getItems = o(
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
	);

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
					borderBottomColor: getBorderColor(props),
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
					fontSize: [2, 2, 2, 4],
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
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				disabled={disabled}
				readOnly={readOnly}
				ref={ref}
				{...rest}
			>
				{getItems(items)}
			</RebassSelect>
		</Box>
	);
});
Select.displayName = 'Select';
Select.propTypes = {
	disabled: PropTypes.bool,
	getLabel: PropTypes.func,
	getValue: PropTypes.func,
	items: PropTypes.array,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.any.isRequired,
};

export default Select;
