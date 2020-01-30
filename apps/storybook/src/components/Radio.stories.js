import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Radio } from '@fast-ai/ui-components';

storiesOf('Radio', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Radio />);
