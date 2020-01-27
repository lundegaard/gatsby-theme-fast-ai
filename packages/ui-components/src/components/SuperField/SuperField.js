import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Label as RebassLabel } from '@rebass/forms';
import { both, complement } from 'ramda';
import { isNilOrEmpty, isPlainObject } from 'ramda-extension';

import useBlockingEffect from '../../hooks/useBlockingEffect';
import useGeneratedId from '../../hooks/useGeneratedId';
import Box from '../Box';
import Text from '../Text';

// Works only for native inputs where the value is primitive value
export const isInputValueEmpty = both(isNilOrEmpty, complement(isPlainObject));

export const Label = ({ children, alwaysShrank }) => {
	const {
		id,
		onLabelShrank,
		onLabelExpand,
		isFocused,
		isInputFilledIn,
		isLabelShrank,
	} = useSuperFieldContext();

	useBlockingEffect(() => {
		if (isInputFilledIn || isFocused || alwaysShrank) {
			onLabelShrank();
		} else {
			onLabelExpand();
		}
	}, [isFocused, isInputFilledIn]);

	return (
		<RebassLabel
			htmlFor={id}
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				transition: 'color 200ms ease, transform 200ms ease 0ms',
				transform: isLabelShrank ? 'translate(0, 0) scale(0.75)' : 'translate(0, 16px)',
				transformOrigin: 'top left',
				color: 'inherit',
			}}
		>
			{children}
		</RebassLabel>
	);
};
Label.propTypes = {
	alwaysShrank: PropTypes.bool,
	children: PropTypes.node,
};

export const Hint = ({ children, ...rest }) => (
	<Text sx={{ minHeight: '16px', fontSize: 0, letterSpacing: 'mono' }} {...rest}>
		{children}
	</Text>
);
Hint.propTypes = {
	children: PropTypes.node,
};

const SuperFieldContext = createContext({
	id: null,
	hasError: false,
	setError: null,
	isFocused: false,
	onFocus: null,
	onBlur: null,
	onInputFill: null,
	onInputEmpty: null,
	isInputFilledIn: false,
	isShrank: false,
	onLabelShrank: null,
	onLabelExpand: null,
	isReadOnly: false,
	isDisabled: false,
});

export const useSuperFieldContext = () => {
	const context = useContext(SuperFieldContext);

	return context;
};

const SuperField = ({ id: idProp, hasError, disabled, readOnly, children }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isInputFilledIn, setIsInputFilledIn] = useState(false);
	const [isLabelShrank, setIsLabelShrank] = useState(false);

	const generatedStub = useGeneratedId();
	const generatedId = `field-${generatedStub}`;

	const context = useMemo(
		() => ({
			id: idProp || generatedId,
			isFocused,
			onFocus: () => setIsFocused(true),
			onBlur: () => setIsFocused(false),
			hasError,
			isInputFilledIn,
			onFill: () => setIsInputFilledIn(true),
			onEmpty: () => setIsInputFilledIn(false),
			isLabelShrank,
			onLabelExpand: () => setIsLabelShrank(false),
			onLabelShrank: () => setIsLabelShrank(true),
			isDisabled: disabled,
			isReadOnly: readOnly,
		}),
		[idProp, generatedId, isFocused, hasError, isInputFilledIn, isLabelShrank, disabled, readOnly]
	);

	return (
		<SuperFieldContext.Provider value={context}>
			<Box
				sx={{
					position: 'relative',
					pt: 3,
					fontFamily: 'body',
					color: (() => {
						if (hasError) {
							return 'danger';
						} else if (disabled) {
							return 'gray';
						} else if (isLabelShrank) {
							return 'inherit';
						} else {
							return 'gray';
						}
					})(),
				}}
			>
				{children}
			</Box>
		</SuperFieldContext.Provider>
	);
};
SuperField.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	id: PropTypes.string,
	readOnly: PropTypes.bool,
};
// TODO:
// aria
// select
// refs - focus
// ok - disabled
// ok - readonly
// ok - chrome autofill
// ok - ripple
// ok -label
// ok - placeholder show after focus - when label is shrunk
// ok - textfield
// ok - label id sync
// ok - floating label
//
//
// dislikes:
// - passing some input props in superfield and input

export default SuperField;
