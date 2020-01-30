import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Slider } from '@fast-ai/ui-components';

storiesOf('Slider', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Slider />);
