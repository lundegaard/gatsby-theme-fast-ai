import { useCallback, useEffect, useRef } from 'react';

export const useDebouncedCallback = (
	callback,
	delay,
	{ maxWait, leading, trailing: optionsTrailing } = {}
) => {
	const maxWaitHandler = useRef(null);
	const maxWaitArgs = useRef([]);

	const trailing = optionsTrailing === undefined ? true : optionsTrailing;
	const leadingCall = useRef(false);

	const functionTimeoutHandler = useRef(null);
	const isComponentUnmounted = useRef(false);

	const debouncedFunction = useRef(callback);
	debouncedFunction.current = callback;

	const cancelDebouncedCallback = useCallback(() => {
		clearTimeout(functionTimeoutHandler.current);
		clearTimeout(maxWaitHandler.current);
		maxWaitHandler.current = null;
		maxWaitArgs.current = [];
		functionTimeoutHandler.current = null;
		leadingCall.current = false;
	}, []);

	useEffect(
		() => () => {
			// we use flag, as we allow to call callPending outside the hook
			isComponentUnmounted.current = true;
		},
		[]
	);

	const debouncedCallback = useCallback(
		(...args) => {
			maxWaitArgs.current = args;
			clearTimeout(functionTimeoutHandler.current);
			if (leadingCall.current) {
				leadingCall.current = false;
			}
			if (!functionTimeoutHandler.current && leading && !leadingCall.current) {
				debouncedFunction.current(...args);
				leadingCall.current = true;
			}

			functionTimeoutHandler.current = setTimeout(() => {
				let shouldCallFunction = true;
				if (leading && leadingCall.current) {
					shouldCallFunction = false;
				}
				cancelDebouncedCallback();

				if (!isComponentUnmounted.current && trailing && shouldCallFunction) {
					debouncedFunction.current(...args);
				}
			}, delay);

			if (maxWait && !maxWaitHandler.current && trailing) {
				maxWaitHandler.current = setTimeout(() => {
					const args = maxWaitArgs.current;
					cancelDebouncedCallback();

					if (!isComponentUnmounted.current) {
						debouncedFunction.current.apply(null, args);
					}
				}, maxWait);
			}
		},
		[maxWait, delay, cancelDebouncedCallback, leading, trailing]
	);

	const callPending = () => {
		if (!functionTimeoutHandler.current) {
			return;
		}

		debouncedFunction.current.apply(null, maxWaitArgs.current);
		cancelDebouncedCallback();
	};

	return [debouncedCallback, cancelDebouncedCallback, callPending];
};
