import { useCallback, useEffect, useRef, useState } from 'react';

import { useDebouncedCallback } from './useDebouncedCallback';

const valueEquality = (left, right) => left === right;

export const useDebounce = (value, delay, { equalityFn, ...restOptions } = {}) => {
	const eq = equalityFn || valueEquality;

	const [state, dispatch] = useState(value);
	const [callback, cancel, callPending] = useDebouncedCallback(
		useCallback(value => dispatch(value), []),
		delay,
		restOptions
	);
	const previousValue = useRef(value);

	useEffect(() => {
		if (!eq(previousValue.current, value)) {
			callback(value);
			previousValue.current = value;
		}
	}, [value, callback, eq]);

	return [state, cancel, callPending];
};
