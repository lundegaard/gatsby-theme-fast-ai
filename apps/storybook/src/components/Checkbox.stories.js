import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Checkbox } from '@fast-ai/ui-components';

storiesOf('Checkbox', module)
	.addDecorator(withKnobs)
	.addParameters({ info: 'Checkbox component' })
	.add('in default', () => <Checkbox label="Generic Checkbox" name="generic-checkbox" />);
