import React from 'react';
import { Col, Container, Row, Slider, SliderField } from '@fast-ai/ui-components';
import { Field } from 'react-powerplug';

export default {
	title: 'Slider',
	description: 'Usage of Radio buttons.',
	component: SliderField,
	subcomponents: { Slider },
};

const AgeFormatter = ({ children }) => (children ? `${children} years` : '-');

export const basic = () => (
	<Container>
		<Row>
			<Col span={12}>
				<Field>
					{({ set, value }) => (
						<SliderField
							label="Fill in loan amount"
							name="amount"
							onChange={event => set(event.target.value)}
							value={value}
							min={0}
							max={1000000}
							step={1}
							hint="with hint"
						/>
					)}
				</Field>
			</Col>
		</Row>

		<Row>
			<Col span={12}>
				<Field>
					{({ set, value }) => (
						<SliderField
							label="Select payment period"
							name="paymentPeriod"
							onChange={event => set(event.target.value)}
							value={value}
							renderValue={AgeFormatter}
							min={0}
							max={100}
							hint="with hint"
						/>
					)}
				</Field>
			</Col>
		</Row>

		<Row>
			<Col span={12}>
				<Field>
					{({ set, value }) => (
						<SliderField
							label="Select payment interval"
							name="paymentPeriod"
							onChange={event => set(event.target.value)}
							value={value}
							renderValue={AgeFormatter}
							hint="error"
							hasError
						/>
					)}
				</Field>
			</Col>
		</Row>
		<Row>
			<Col span={12}>
				<Field>
					{({ set, value }) => (
						<SliderField
							label="Select payment interval"
							name="paymentPeriod"
							onChange={event => set(event.target.value)}
							value={value}
							renderValue={AgeFormatter}
							hint="disabled"
							disabled
						/>
					)}
				</Field>
			</Col>
		</Row>
	</Container>
);
