import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { RadioField } from '@fast-ai/ui-components';

storiesOf('RadioField', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <RadioField />);
