import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useGlobalListener } from '@restart/hooks';
import { keyMirror } from 'ramda-extension';

const EVENTS = Object.freeze(['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']);
const initialState = { isIdle: false, idleStart: null };

const ActionTypes = keyMirror({ RESET: null, START: null });

const reducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.RESET: {
			return initialState;
		}
		case ActionTypes.START: {
			return {
				isIdle: true,
				startIdleTime: action.payload.time,
			};
		}
		default: {
			return state;
		}
	}
};

/**
 * Detects if user is active.
 * It checks for mouse movements in the window. If there is no event fired in `idleTimeout` interval,
 * than is we consider window in `idle` state.
 *
 * @param {number} idleTimeout
 *
 * @return {Object} API
 * @return {boolean} API.isIdle True, if user is considered inactive.
 * @return {number} API.startIdleTime number Timestamp - when we swithed to `isIdle === true`
 */
export const useIdleTime = ({ idleTimeout = 5000 } = {}) => {
	const timer = useRef();
	const [state, dispatch] = useReducer(reducer, initialState);

	const resetTimer = useCallback(() => {
		dispatch({ type: ActionTypes.RESET });

		clearTimeout(timer.current);

		timer.current = setTimeout(
			() => void dispatch({ type: ActionTypes.START, payload: { time: Date.now() } }),
			idleTimeout
		);
	}, [dispatch, idleTimeout]);

	useEffect(() => void resetTimer(), [resetTimer]);

	EVENTS.forEach(name => {
		// NOTE: `EVENTS` is constant array that is not meant for mutation.
		// The order of calling the `useGlobalListener` hook should be always
		// the same.

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useGlobalListener(name, resetTimer, true);
	});

	return state;
};

export default useIdleTime;
