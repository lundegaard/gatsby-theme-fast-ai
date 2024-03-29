import React, { forwardRef, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import useGeneratedId from '../hooks/useGeneratedId';
import Box from '../Box';

import { SuperFieldContext } from './contexts';

// Works only for native inputs where the value is primitive value

const SuperField = forwardRef(
	({ id: idProp, hasError, disabled, readOnly, children }, ref) => {
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
			[
				idProp,
				generatedId,
				isFocused,
				hasError,
				isInputFilledIn,
				isLabelShrank,
				disabled,
				readOnly,
			],
		);

		return (
			<SuperFieldContext.Provider value={context}>
				<Box
					ref={ref}
					sx={{
						position: 'relative',
						pt: 3,
						fontFamily: 'body',
						color: (() => {
							if (hasError) {
								return 'danger';
							} else if (disabled) {
								return 'gray.2';
							} else if (isLabelShrank) {
								return 'inherit';
							} else {
								return 'gray.2';
							}
						})(),
					}}
				>
					{children}
				</Box>
			</SuperFieldContext.Provider>
		);
	},
);
SuperField.displayName = 'SuperField';
SuperField.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	id: PropTypes.string,
	readOnly: PropTypes.bool,
};

export default SuperField;
