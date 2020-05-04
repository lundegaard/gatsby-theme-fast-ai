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
				<Field initial={[10]}>
					{({ set, value }) => (
						<SliderField
							label="One rail"
							name="amount"
							onChange={set}
							value={value}
							min={0}
							max={100}
							step={1}
							hint="with hint"
						/>
					)}
				</Field>
			</Col>
		</Row>

		<Row>
			<Col span={12}>
				<Field initial={[10]}>
					{({ set, value }) => (
						<SliderField
							label="With step"
							name="amount"
							onChange={set}
							value={value}
							min={0}
							max={100}
							step={10}
							hint="with hint"
						/>
					)}
				</Field>
			</Col>
		</Row>

		<Row>
			<Col span={12}>
				<Field initial={[10, 90]}>
					{({ set, value }) => (
						<SliderField
							label="Multiple rails"
							name="amount"
							onChange={set}
							value={value}
							min={0}
							max={100}
							step={1}
							hint="with hint"
						/>
					)}
				</Field>
			</Col>
		</Row>

		<Row>
			<Col span={12}>
				<Field initial={[10, 90]}>
					{({ set, value }) => (
						<SliderField
							label="Formatter"
							name="paymentPeriod"
							onChange={set}
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
				<Field initial={[10, 90]}>
					{({ set, value }) => (
						<SliderField
							label="Error"
							name="paymentPeriod"
							min={0}
							max={100}
							onChange={set}
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
				<Field initial={[10, 50, 90]}>
					{({ set, value }) => (
						<SliderField
							label="Disabled"
							name="paymentPeriod"
							min={0}
							max={100}
							onChange={set}
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
