import React, { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Col,
	Flex,
	Heading,
	Link,
	Radio,
	Row,
	Text,
	useDebounce,
	useDevConsole,
	useModal,
} from '@fast-ai/ui-components';
import { FormattedMessage, useIntl } from 'gatsby-theme-fast-ai';
import createRandomString from 'crypto-random-string';

import m from '../intl/messages';
import { AmountFormatter, DurationFormatter } from '../formatters';
import {
	CheckboxField,
	NumberTextField,
	PredictionsModal,
	RadioGroupField,
	SelectField,
	SliderField,
	TextField,
	useForm,
} from '../components';
import { CoborrowerChoice, MaritalStatus, getEducationByLanguage } from '../lookups';
import { fetchPredictions } from '../sa';

const FormHeading = props => <Heading as="h2" mt={0} mb={4} {...props} />;
const HalfCol = props => <Col span={[12, 12, 6]} mb={4} {...props} />;
const FullCol = props => <Col span={12} mb={4} {...props} />;

// TODO: validations
const isRequired = x => (!x ? 'Required' : null);

const PersonalInfo = () => {
	const intl = useIntl();
	const Education = useMemo(() => getEducationByLanguage(intl.locale), [intl.locale]);

	return (
		<Fragment>
			<HalfCol>
				<TextField
					validate={isRequired}
					label={<FormattedMessage {...m.givenName} />}
					field="borrower.givenName"
				/>
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

const LoanInfo = ({ monthlyFee }) => (
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
				min={1}
				max={360}
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
						value={value}
						label={<FormattedMessage {...m[`${CoborrowerChoice.name}_${value}`]} />}
					/>
				))}
			</RadioGroupField>
		</FullCol>

		<FullCol>
			<Flex justifyContent="space-between" alignItems="center">
				<Heading as="div" mb={0} mt={0}>
					<FormattedMessage {...m.totalAmountPerMonth} />
				</Heading>
				<Heading as="h2" mb={0} mt={0}>
					<AmountFormatter>{monthlyFee}</AmountFormatter>
				</Heading>
			</Flex>
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

LoanInfo.propTypes = {
	monthlyFee: PropTypes.node,
};

const defaultValues = {
	webdata: { coborrowerChoice: 'SINGLE' },
	loanInfo: {
		numberOfInstalments: 12,
		amount: 100000,
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
	},
};

const applicationId = `demo-${createRandomString(10)}`;

const DemoForm = () => {
	const { openModal } = useModal({ component: PredictionsModal });

	const {
		Form,
		meta: { isSubmitting, canSubmit },
		getFieldValue,
		attemptSubmit: handleClickSubmit,
		send,
		register,
	} = useForm({
		defaultValues,
		name: 'zoeDemo',
		onSubmit: async values => {
			send(values);
			const predictions = await fetchPredictions(applicationId);
			openModal({ predictions });
		},
	});

	const { log } = useDevConsole();

	useEffect(() => {
		register(applicationId);
	}, [register]);

	useEffect(() => {
		log(['Application ID', applicationId]);

		if (typeof window === 'undefined' || !window.sa) {
			return;
		}

		// TODO: Remove
		const { tid } = window.sa('get', 'userInfo');

		log(['Tenant ID', tid]);
	}, [getFieldValue, log]);

	const [monthlyFeeDebounced] = useDebounce(monthlyFee, 200);
	const monthlyFee =
		getFieldValue('loanInfo.amount') / getFieldValue('loanInfo.numberOfInstalments');

	return (
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

						<LoanInfo monthlyFee={monthlyFeeDebounced} />

						<FullCol>
							<Button
								onClick={handleClickSubmit}
								variant="secondary"
								width={1}
								disabled={!canSubmit || isSubmitting}
							>
								<FormattedMessage {...m.apply} />
							</Button>
						</FullCol>
					</Row>
				</Col>
			</Row>
		</Form>
	);
};

export default DemoForm;
