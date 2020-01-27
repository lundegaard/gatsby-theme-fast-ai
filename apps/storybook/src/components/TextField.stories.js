import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { TextField } from '@fast-ai/ui-components';

storiesOf('TextField', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <TextField />);
