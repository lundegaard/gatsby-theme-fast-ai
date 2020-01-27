import React, { Fragment, forwardRef, useCallback, useState } from 'react';
import {
	Col,
	SelectField as FASelectField,
	TextField as FATextField,
	Heading,
	Row,
} from '@fast-ai/ui-components';
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

const TextField = forwardRef((props, ref) => {
	const { getInputProps } = useSaFieldTracker();

	const inputProps = getInputProps({ ref, ...props });

	return <FATextField {...inputProps} />;
});

const SelectField = forwardRef((props, ref) => {
	const { getInputProps } = useSaFieldTracker();

	const inputProps = getInputProps({ ref, ...props });

	return <FASelectField {...inputProps} />;
});

const FormRow = props => <Row mb={2} {...props} />;
const FormHeading = props => <Heading mb={4} {...props} />;

const Form = () => {
	// TODO
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('filled');
	const [surnameError, setSurnameError] = useState(null);
	const [education, setEducation] = useState('');

	return (
		<Fragment>
			<FormRow>
				<Col span={6}>
					<TextField
						label="Name"
						name="name"
						onChange={event => setName(event.target.value)}
						value={name}
					/>
				</Col>
				<Col span={6}>
					<TextField
						label="Surname"
						name="surname"
						onChange={event => {
							if (event.target.value === 'x') {
								setSurnameError('Error!');
							}
							setSurname(event.target.value);
						}}
						value={surname}
						hasError={!!surnameError}
						hint={surnameError}
						placeholder="Fill in a surname"
					/>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<TextField
						label="Personal ID"
						name="id"
						onChange={event => setName(event.target.value)}
						value={name}
						hint="with hint"
					/>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<TextField
						disabled
						label="Personal ID"
						name="id"
						onChange={event => setName(event.target.value)}
						value={name}
						hint="disabled"
					/>
				</Col>
				<Col span={12}>
					<TextField
						label="Personal ID"
						name="id"
						onChange={event => setName(event.target.value)}
						value={name}
						readOnly
						hint="readOnly"
					/>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={6}>
					<SelectField
						label="Education"
						name="education"
						onChange={event => setEducation(event.target.value)}
						value={education}
						placeholder="None"
						items={[
							{ value: '1', label: 'Elementary' },
							{ value: '2', label: 'High-school' },
						]}
						hint="Your highest education"
					/>
				</Col>
				<Col span={6}>
					<SelectField
						label="Education"
						name="education"
						onChange={event => setEducation(event.target.value)}
						value={education}
						items={[
							{ value: '', label: '' },
							{ value: '1', label: 'Elementary' },
							{ value: '2', label: 'High-school' },
						]}
						hint="Your highest education"
					/>
				</Col>
			</FormRow>
		</Fragment>
	);
};
const Index = () => (
	<Page>
		<Seo title="Demo" />
		<form
			onSubmit={event => {
				event.preventDefault();
				console.log('submit');
			}}
		>
			<Row>
				<Col span={6}>
					<FormHeading>
						<FormattedMessage id="home.title" />
					</FormHeading>

					<Form />
				</Col>
				<Col span={6}>
					<FormattedMessage id="home.title" />
					<button>Submit</button>
				</Col>
			</Row>
		</form>
	</Page>
);

export default Index;
