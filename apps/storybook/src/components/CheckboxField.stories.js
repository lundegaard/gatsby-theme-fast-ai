import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { CheckboxField } from '@fast-ai/ui-components';

storiesOf('CheckboxField', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <CheckboxField />);
