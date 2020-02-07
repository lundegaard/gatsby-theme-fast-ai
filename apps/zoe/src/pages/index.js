import React, { Fragment, forwardRef, useCallback, useMemo } from 'react';
import {
	Button,
	Col,
	CheckboxField as FACheckboxField,
	RadioGroupField as FARadioGroupField,
	SelectField as FASelectField,
	SliderField as FASliderField,
	TextField as FATextField,
	Heading,
	Link,
	Radio,
	Row,
	Text,
	getDisplayName,
} from '@fast-ai/ui-components';
import { FormattedMessage, Page, Seo, useIntl } from 'gatsby-theme-fast-ai';
import { splitFormProps, useField, useForm } from 'react-form';

import m from '../intl/messages';
import { AmountFormatter, DurationFormatter } from '../formatters';
import { CoborrowerChoice, MaritalStatus, getEducationByLanguage } from '../lookups';

const useSa = () => (/* ...args */) => null; // console.log('SA', args);
// const useSa = () => window.sa;

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
	sBiometrics: {
		keyUp: 'keyup',
		keyDown: 'keydown',
	},
};
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

						saInstance(`s-form:${mapper.sForm[eventName] || eventName}`, { event });
						saInstance(`s-biometrics:${mapper.sBiometrics[eventName] || eventName}`, { event });

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

const wrapWithStateAndSA = Comp => {
	const WrappedComponent = forwardRef((props, ref) => {
		const [field, fieldOptions, rest] = splitFormProps(props);

		const {
			meta: { error, isTouched },
			getInputProps,
		} = useField(field, fieldOptions);

		const { getInputProps: saGetInputProps } = useSaFieldTracker();

		const inputProps = saGetInputProps(getInputProps({ ref, ...rest }));

		const hasError = !!hasError && isTouched;
		return <Comp {...inputProps} hasError={hasError} hint={hasError && error} />;
	});
	WrappedComponent.displayName = `WrappedComponent(${getDisplayName(Comp)})`;

	return WrappedComponent;
};

const TextField = wrapWithStateAndSA(FATextField);
const SelectField = wrapWithStateAndSA(FASelectField);
const CheckboxField = wrapWithStateAndSA(FACheckboxField);
const RadioGroupField = wrapWithStateAndSA(FARadioGroupField);
const SliderField = wrapWithStateAndSA(FASliderField);

const NumberTextField = forwardRef((props, ref) => (
	<TextField
		ref={ref}
		inputProps={{
			pattern: 'd*',
		}}
		{...props}
	/>
));
NumberTextField.displayName = 'NumberTextField';

const FormHeading = props => <Heading as="h2" mt={0} mb={4} {...props} />;
const HalfCol = props => <Col span={[12, 12, 6]} mb={4} {...props} />;
const FullCol = props => <Col span={12} mb={4} {...props} />;

const apply = async values => {
	await new Promise(resolve => setTimeout(resolve, 1000));

	return values;
};

const PersonalInfo = () => {
	const intl = useIntl();
	const Education = useMemo(() => getEducationByLanguage(intl.locale), [intl.locale]);

	return (
		<Fragment>
			<HalfCol>
				<TextField label={<FormattedMessage {...m.givenName} />} field="borrower.givenName" />
			</HalfCol>

			<HalfCol>
				<TextField label={<FormattedMessage {...m.familyName} />} field="borrower.familyName" />
			</HalfCol>

			<HalfCol>
				<TextField label={<FormattedMessage {...m.birthNumber} />} field="borrower.birthNumber" />
			</HalfCol>

			<HalfCol>
				<TextField
					label={<FormattedMessage {...m.streetAddress} />}
					field="borrower.address.streetAddress"
				/>
			</HalfCol>

			<HalfCol>
				<TextField
					label={<FormattedMessage {...m.streetLocality} />}
					field="borrower.address.streetLocality"
				/>
			</HalfCol>

			<HalfCol>
				<TextField
					label={<FormattedMessage {...m.postalCode} />}
					field="borrower.address.postalCode"
				/>
			</HalfCol>

			<HalfCol>
				<TextField label={<FormattedMessage {...m.phoneNumber} />} field="borrower.phoneNumber" />
			</HalfCol>

			<HalfCol>
				<TextField label={<FormattedMessage {...m.email} />} field="borrower.email" />
			</HalfCol>

			<HalfCol>
				<SelectField
					label={<FormattedMessage {...m.maritalStatus} />}
					field="borrower.maritalStatus"
					items={['', ...MaritalStatus.values].map(status => ({
						value: status,
						label: status ? intl.formatMessage(m[`maritalStatus_${status}`]) : status,
					}))}
				/>
			</HalfCol>

			<HalfCol>
				<SelectField
					label={<FormattedMessage {...m.education} />}
					field="borrower.education"
					items={['', ...Education.values].map(level => ({
						value: level,
						label: level ? intl.formatMessage(m[`${Education.name}_${level}`]) : level,
					}))}
				/>
			</HalfCol>

			<HalfCol>
				<NumberTextField
					label={<FormattedMessage {...m.netIncomeMain} />}
					field="borrower.balance.netIncomeMain"
				/>
			</HalfCol>

			<HalfCol>
				<NumberTextField
					label={<FormattedMessage {...m.expenditureAnotherInstallment} />}
					field="borrower.balance.expenditureAnotherInstallment"
				/>
			</HalfCol>
		</Fragment>
	);
};

const LoanInfo = () => (
	<Fragment>
		<FullCol>
			<SliderField
				label={<FormattedMessage {...m.loanInfoAmount} />}
				field="loanInfo.amount"
				renderValue={AmountFormatter}
				min={0}
				max={10000000}
				step={1}
			/>
		</FullCol>
		<FullCol>
			<SliderField
				label={<FormattedMessage {...m.numberOfInstalments} />}
				field="loanInfo.numberOfInstalments"
				renderValue={DurationFormatter}
				min={0}
				max={10000000}
				step={1}
			/>
		</FullCol>

		<FullCol>
			<RadioGroupField
				legend={<FormattedMessage {...m.coborrowerChoice} />}
				field="webdata.coborrowerChoice"
			>
				{CoborrowerChoice.values.map(value => (
					<Radio
						key={value}
						label={<FormattedMessage {...m[`${CoborrowerChoice.name}_${value}`]} value={value} />}
					/>
				))}
			</RadioGroupField>
		</FullCol>

		<FullCol>
			<CheckboxField
				label={
					<Text fontSize={[1, 1, 1, 2]} p={0} m={0}>
						<FormattedMessage
							{...m.terms}
							values={{
								// eslint-disable-next-line react/display-name
								a: (...children) => <Link href="#" children={children} />,
							}}
						/>
					</Text>
				}
				field="terms"
			/>
		</FullCol>
	</Fragment>
);

const defaultValues = {
	loanInfo: {
		numberOfInstalments: 0,
		amount: 0,
	},
	borrower: {
		givenName: '',
		familyName: '',
		education: '',
		maritalStatus: '',
		birthNumber: '',
		email: '',
		phoneNumber: '',
		balance: {
			netIncomeMain: '',
			expenditureAnotherInstallment: '',
		},
		address: {
			streetAddress: '',
			streetLocality: '',
			postalCode: '',
		},
		coborrowerChoice: 'SINGLE',
	},
};
const Index = () => {
	const {
		Form,
		meta: { isSubmitting, canSubmit },
	} = useForm({
		defaultValues,
		onSubmit: async values => {
			console.log({ values });
			const response = await apply(values);

			console.log({ response });
		},
		// debugForm: true,
	});

	return (
		<Page>
			<Seo title="Demo" />
			<Form>
				<Row flexWrap="wrap">
					<Col span={[12, 12, 6]}>
						<Row flexWrap="wrap">
							<FullCol>
								<FormHeading>
									<FormattedMessage {...m.personalInfoTitle} />
								</FormHeading>
							</FullCol>

							<PersonalInfo />
						</Row>
					</Col>
					<Col span={[12, 12, 6]}>
						<Row flexWrap="wrap">
							<FullCol>
								<FormHeading>
									<FormattedMessage {...m.setupLoanTitle} />
								</FormHeading>
							</FullCol>

							<LoanInfo />

							<FullCol>
								<Button variant="secondary" width={1} disabled={!canSubmit || isSubmitting}>
									<FormattedMessage {...m.apply} />
								</Button>
							</FullCol>
						</Row>
					</Col>
				</Row>
			</Form>
		</Page>
	);
};

export default Index;
