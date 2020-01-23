import React, { forwardRef, useCallback, useState } from 'react';
import { Col, Row, SuperField as SuperFieldUI } from '@fast-ai/ui-components';
import { FormattedMessage, Page, Seo } from 'gatsby-theme-fast-ai';

const useSa = () => (...args) => console.log('SA', args);
// const useSa = () => window.sa;

// just for a virtual components - only a changeEvent
const getEventCallbackName = eventName =>
	`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

const defaultGetEvent = (eventName, firstArg) => firstArg && firstArg.nativeEvent;

const useSaFieldTracker = ({
	/**
	 * @param {String} eventName - Name of an event - "change", "focus", ...
	 * @param {...any} eventArguments Arguments passed to the handler from which the Event object should be derived.
	 *
	 * @return {Object} eventObject - Object that is passed to the appropriate SA methods.
	 */
	getEvent = defaultGetEvent,
	trackedEvents = ['change', 'focus', 'blur', 'keyDown', 'keyUp', 'copy', 'paste', 'cut'],
} = {}) => {
	const saInstance = useSa();

	const getInputProps = useCallback(
		props => {
			const eventHandlersWithProps = trackedEvents.reduce((acc, eventName) => {
				const eventCallbackName = getEventCallbackName(eventName);

				return {
					...acc,
					[eventCallbackName]: (...args) => {
						const event = getEvent(eventName, ...args);

						saInstance(`s-form:${eventName}`, { event });
						saInstance(`s-biometrics:${eventName}`, { event });

						if (acc[eventCallbackName]) {
							return acc[eventCallbackName](...args);
						}
					},
				};
			}, props);

			return eventHandlersWithProps;
		},
		[getEvent, saInstance, trackedEvents]
	);

	return { getInputProps };
};

// const SuperField = withSaInputTracker(TextFieldUI);
const SuperField = forwardRef((props, ref) => {
	const { getInputProps } = useSaFieldTracker();

	const inputProps = getInputProps({ ref, ...props });

	console.log({ inputProps });

	return <SuperFieldUI {...inputProps} />;
});

const Form = () => {
	// TODO
	const [name, setName] = useState('');

	return (
		<Row>
			<Col span={6}>
				<SuperField name="name" onChange={event => setName(event.target.name)} value={name} />
			</Col>
			<Col span={6}>
				<FormattedMessage id="home.title" />
			</Col>
		</Row>
	);
};
const Index = () => (
	<Page>
		<Seo title="Demo" />
		<Form />
	</Page>
);

export default Index;
