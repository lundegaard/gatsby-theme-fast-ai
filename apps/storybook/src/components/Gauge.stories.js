import React, { Fragment } from 'react';
import { Flex, Gauge } from '@fast-ai/ui-components';
import { number, withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'Gauge',
	description: '',
	component: Gauge,
	decorators: [withKnobs],
};

const toPercent = x => `${(x * 100).toFixed(0)}`;
const toPercentUnit = x => `${toPercent(x)}%`;

const props = {
	formatLegend: toPercent,
	format: toPercentUnit,
};

export const groups = () => (
	<Fragment>
		<Flex justifyContent="space-between" flexWrap="wrap">
			<Gauge value={0} {...props} />
			<Gauge value={1 / 3} {...props} />
			<Gauge value={1} {...props} />
			<Gauge variant="danger" value={1} {...props} />
		</Flex>
		<Flex justifyContent="space-between" flexWrap="wrap">
			<Gauge
				value={number('Value', 0, { range: true, min: 0, max: 1, step: 0.1 })}
				arcAngle={number('Angle', 220, {
					range: true,
					min: 0,
					max: 360,
					step: 10,
				})}
				{...props}
			/>
		</Flex>
	</Fragment>
);
