import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Input } from '@fast-ai/ui-components';

storiesOf('Input', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Input />);
