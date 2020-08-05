import { useCallback, useEffect, useRef, useState } from 'react';
import { equals } from 'ramda';

import useDebouncedCallback from './useDebouncedCallback';

const useDebounce = (
	value,
	delay,
	{ equalityFn = equals, ...restOptions } = {}
) => {
	const [state, dispatch] = useState(value);
	const [callback, cancel, callPending] = useDebouncedCallback(
		useCallback((value) => dispatch(value), []),
		delay,
		restOptions
	);
	const previousValue = useRef(value);

	useEffect(() => {
		if (!equalityFn(previousValue.current, value)) {
			callback(value);
			previousValue.current = value;
		}
	}, [value, callback, equalityFn]);

	return [state, cancel, callPending];
};

export default useDebounce;
