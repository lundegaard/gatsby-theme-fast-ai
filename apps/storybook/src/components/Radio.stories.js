import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { noop } from 'ramda-extension';
import { Radio } from '@fast-ai/ui-components';

storiesOf('Radio', module)
	.addDecorator(withKnobs)
	.add('in default', () => (
		<Radio checked label="Generic Radio" onChange={noop} name="generic-radio" />
	));
