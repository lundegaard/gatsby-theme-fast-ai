import React, { Fragment, forwardRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Col,
	CheckboxField as FACheckboxField,
	RadioGroupField as FARadioGroupField,
	SelectField as FASelectField,
	SliderField as FASliderField,
	TextField as FATextField,
	Heading,
	Radio,
	Row,
	Text,
} from '@fast-ai/ui-components';
import { FormattedMessage, FormattedNumber, Page, Seo } from 'gatsby-theme-fast-ai';

const useSa = () => (...args) => console.log('SA', args);
// const useSa = () => window.sa;

// just for a virtual components - only a changeEvent
const getEventCallbackName = eventName =>
	`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

const defaultGetEvent = (eventName, firstArg) => firstArg && firstArg.nativeEvent;

const AmountFormatter = ({ children }) => {
	if (children == null) {
		return '-';
	}

	return children ? (
		<Fragment>
			<FormattedNumber value={children} minimumFractionDigits={2}>
				{value => value.replace(/00$/, '-')}
			</FormattedNumber>
		</Fragment>
	) : (
		'-'
	);
};
AmountFormatter.propTypes = { children: PropTypes.node };

const AgeFormatter = ({ children }) => (children ? `${children} years` : '-');
AgeFormatter.propTypes = { children: PropTypes.node };

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

const CheckboxField = forwardRef((props, ref) => {
	const { getInputProps } = useSaFieldTracker();

	const inputProps = getInputProps({ ref, ...props });

	return <FACheckboxField {...inputProps} />;
});

const RadioGroupField = forwardRef((props, ref) => {
	const { getInputProps } = useSaFieldTracker();

	const inputProps = getInputProps({ ref, ...props });

	return <FARadioGroupField {...inputProps} />;
});

const SliderField = forwardRef((props, ref) => {
	const { getInputProps } = useSaFieldTracker();

	const inputProps = getInputProps({ ref, ...props });

	return <FASliderField {...inputProps} />;
});

const FormRow = props => <Row mb={2} {...props} />;
const FormHeading = props => <Heading mb={4} {...props} />;

const PersonalInfo = () => {
	// TODO
	const [name, setName] = useState('');
	const [partner, setPartner] = useState('');
	const [surname, setSurname] = useState('filled');
	const [surnameError, setSurnameError] = useState(null);
	const [education, setEducation] = useState('');
	const [terms, setTerms] = useState(false);

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

			<FormRow>
				<Col span={12}>
					<CheckboxField
						label={<Text fontSize={1}>I agreee with terms and conditions</Text>}
						name="terms"
						checked={terms}
						onChange={event => setTerms(event.target.checked)}
						value
					/>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<CheckboxField
						label="I agreee with terms and conditions"
						name="terms"
						checked={terms}
						onChange={event => setTerms(event.target.checked)}
						value
						hasError
						hint="Error"
					/>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<CheckboxField
						label="I agreee with terms and conditions"
						name="terms"
						checked={terms}
						onChange={event => setTerms(event.target.checked)}
						value
						disabled
					/>
				</Col>
			</FormRow>

			<FormRow>
				<Col span={12}>
					<RadioGroupField
						legend="Who is your partner?"
						onChange={event => setPartner(event.target.value)}
						name="partner"
						value={partner}
					>
						{[
							{ value: 'individual', label: 'Individual' },
							{ value: 'with-parner', label: 'With partner' },
						].map(itemProps => (
							<Radio key={itemProps.value} {...itemProps} />
						))}
					</RadioGroupField>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<RadioGroupField
						legend="Who is your partner?"
						onChange={event => setPartner(event.target.value)}
						name="partner"
						value={partner}
						disabled
					>
						{[
							{ value: 'individual', label: 'Individual' },
							{ value: 'with-parner', label: 'With partner' },
						].map(itemProps => (
							<Radio key={itemProps.value} {...itemProps} />
						))}
					</RadioGroupField>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<RadioGroupField
						legend="Who is your partner?"
						onChange={event => setPartner(event.target.value)}
						name="partner"
						value={partner}
						hint="Error"
						hasError
					>
						{[
							{ value: 'individual', label: 'Individual' },
							{ value: 'with-parner', label: 'With partner' },
						].map(itemProps => (
							<Radio key={itemProps.value} {...itemProps} />
						))}
					</RadioGroupField>
				</Col>
			</FormRow>
		</Fragment>
	);
};

const LoanInfo = () => {
	const [amount, setAmount] = useState(200000);
	const [paymentPeriod, setPaymentPeriod] = useState(24);

	return (
		<Fragment>
			<FormRow>
				<Col span={12}>
					<SliderField
						label="Fill in loan amount"
						name="amount"
						onChange={event => setAmount(event.target.value)}
						value={amount}
						renderValue={AmountFormatter}
						min={0}
						max={1000000}
						step={1}
						hint="with hint"
					/>
				</Col>
			</FormRow>

			<FormRow>
				<Col span={12}>
					<SliderField
						label="Select payment period"
						name="paymentPeriod"
						onChange={event => setPaymentPeriod(event.target.value)}
						value={paymentPeriod}
						renderValue={AgeFormatter}
						min={0}
						max={100}
						hint="with hint"
					/>
				</Col>
			</FormRow>

			<FormRow>
				<Col span={12}>
					<SliderField
						label="Select payment interval"
						name="paymentPeriod"
						onChange={event => setPaymentPeriod(event.target.value)}
						value={paymentPeriod}
						renderValue={AgeFormatter}
						hint="error"
						hasError
					/>
				</Col>
			</FormRow>
			<FormRow>
				<Col span={12}>
					<SliderField
						label="Select payment interval"
						name="paymentPeriod"
						onChange={event => setPaymentPeriod(event.target.value)}
						value={paymentPeriod}
						renderValue={AgeFormatter}
						hint="disabled"
						disabled
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
			}}
		>
			<Row>
				<Col span={6}>
					<FormHeading>
						<FormattedMessage id="home.title" />
					</FormHeading>

					<PersonalInfo />
				</Col>
				<Col span={6}>
					<FormHeading>
						<FormattedMessage id="home.title" />
					</FormHeading>

					<LoanInfo />
				</Col>
			</Row>
		</form>
	</Page>
);

export default Index;
