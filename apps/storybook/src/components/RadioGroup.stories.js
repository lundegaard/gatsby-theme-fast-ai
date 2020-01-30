import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { RadioGroup } from '@fast-ai/ui-components';

storiesOf('RadioGroup', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <RadioGroup />);
