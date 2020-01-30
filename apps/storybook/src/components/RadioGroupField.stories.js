import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { RadioGroupField } from '@fast-ai/ui-components';

storiesOf('RadioGroupField', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <RadioGroupField />);
