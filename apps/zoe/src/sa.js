import { useCallback } from 'react';

export const useSA = () => ({ sa: typeof window === 'undefined' ? {} : window.sa });

// just for a virtual components - only a changeEvent
const getEventCallbackName = eventName =>
	`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

const defaultGetEvent = (eventName, firstArg) => firstArg && firstArg.nativeEvent;

const mapper = {
	sForm: {
		copy: 'clipboard',
		paste: 'clipboard',
		cut: 'clipboard',
	},
	sBiometrics: {},
};

export const useSAFieldTracker = ({
	/**
	 * @param {String} eventName - Name of an event - "change", "focus", ...
	 * @param {...any} eventArguments Arguments passed to the handler from which the Event object should be derived.
	 *
	 * @return {Object} eventObject - Object that is passed to the appropriate SA methods.
	 */
	getEvent = defaultGetEvent,
	trackedEvents = ['change', 'focus', 'blur', 'keyDown', 'keyUp', 'copy', 'paste', 'cut'],
} = {}) => {
	const { sa } = useSA();

	const getInputProps = useCallback(
		props => {
			const eventHandlersWithProps = trackedEvents.reduce((currentCallbacks, eventName) => {
				const eventCallbackName = getEventCallbackName(eventName);

				return {
					...currentCallbacks,
					[eventCallbackName]: (...args) => {
						const event = getEvent(eventName, ...args);
						const methodName = eventName.toLowerCase();

						sa(`s-form:${mapper.sForm[methodName] || methodName}`, { event });
						sa(`s-biometrics:${mapper.sBiometrics[methodName] || methodName}`, { event });

						if (currentCallbacks[eventCallbackName]) {
							return currentCallbacks[eventCallbackName](...args);
						}
					},
				};
			}, props);

			return eventHandlersWithProps;
		},
		[getEvent, sa, trackedEvents]
	);

	return { getInputProps };
};
