import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { SliderField } from '@fast-ai/ui-components';

storiesOf('SliderField', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <SliderField />);
