import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { MonospacedText } from '@fast-ai/ui-components';

storiesOf('MonospacedText', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <MonospacedText />);
