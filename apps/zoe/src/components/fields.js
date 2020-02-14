import React, { forwardRef } from 'react';
import {
	CheckboxField as FACheckboxField,
	RadioGroupField as FARadioGroupField,
	SelectField as FASelectField,
	SliderField as FASliderField,
	TextField as FATextField,
	getDisplayName,
} from '@fast-ai/ui-components';
import { splitFormProps, useField } from 'react-form';

import { useSAFieldTracker } from '../sa';

const wrapWithStateAndSA = Comp => {
	const Field = forwardRef((props, ref) => {
		const [field, fieldOptions, rest] = splitFormProps(props);

		const {
			meta: { error, isTouched },
			getInputProps,
		} = useField(field, fieldOptions);

		const { getInputProps: saGetInputProps } = useSAFieldTracker();

		const inputProps = saGetInputProps(getInputProps({ ref, ...rest }));

		const hasError = !!error && isTouched;
		return <Comp {...inputProps} hasError={hasError} hint={hasError && error} />;
	});
	Field.displayName = `Field(${getDisplayName(Comp)})`;

	return Field;
};

export const TextField = wrapWithStateAndSA(FATextField);
export const SelectField = wrapWithStateAndSA(FASelectField);
export const CheckboxField = wrapWithStateAndSA(FACheckboxField);
export const RadioGroupField = wrapWithStateAndSA(FARadioGroupField);
export const SliderField = wrapWithStateAndSA(FASliderField);
export const NumberTextField = forwardRef((props, ref) => (
	<TextField
		ref={ref}
		inputProps={{
			pattern: 'd*',
		}}
		{...props}
	/>
));
NumberTextField.displayName = 'NumberTextField';
