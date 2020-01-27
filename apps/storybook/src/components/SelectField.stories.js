import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { SelectField } from '@fast-ai/ui-components';

storiesOf('SelectField', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <SelectField />);
