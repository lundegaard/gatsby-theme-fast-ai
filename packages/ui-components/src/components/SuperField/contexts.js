import { createContext } from 'react';

export const SuperFieldContext = createContext({
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
