import React from 'react';
import { Col, Container, Radio, RadioGroup, RadioGroupField, Row } from '@fast-ai/ui-components';
import { Field } from 'react-powerplug';

export default {
	title: 'Radios',
	description: 'Usage of Radio buttons.',
	component: RadioGroupField,
	subcomponents: { Radio, RadioGroup },
};

export const basic = () => (
	<Container>
		<Row p={2}>
			<Col span={6}>
				<Field>
					{({ value, set }) => (
						<RadioGroupField
							legend="Who is your partner?"
							onChange={event => set(event.target.value)}
							name="partner"
							value={value}
						>
							{[
								{ value: 'individual', label: 'Individual' },
								{ value: 'with-parner', label: 'With partner' },
							].map(itemProps => (
								<Radio key={itemProps.value} {...itemProps} />
							))}
						</RadioGroupField>
					)}
				</Field>
			</Col>
		</Row>
	</Container>
);

export const errors = () => (
	<Container>
		<Row p={2}>
			<Col span={6}>
				<Field>
					{({ value, set }) => (
						<RadioGroupField
							legend="Who is your partner?"
							onChange={event => set(event.target.value)}
							name="partner"
							value={value}
							hasError
							hint="Error message"
						>
							{[
								{ value: 'individual', label: 'Individual' },
								{ value: 'with-parner', label: 'With partner' },
							].map(itemProps => (
								<Radio key={itemProps.value} {...itemProps} />
							))}
						</RadioGroupField>
					)}
				</Field>
			</Col>
		</Row>
	</Container>
);

export const disabled = () => (
	<Container>
		<Row p={2}>
			<Col span={6}>
				<Field initial="individual">
					{({ value, set }) => (
						<RadioGroupField
							legend="Who is your partner?"
							onChange={event => set(event.target.value)}
							name="partner"
							value={value}
							disabled
						>
							{[
								{ value: 'individual', label: 'Individual' },
								{ value: 'with-parner', label: 'With partner' },
							].map(itemProps => (
								<Radio key={itemProps.value} {...itemProps} />
							))}
						</RadioGroupField>
					)}
				</Field>
			</Col>
		</Row>
	</Container>
);
