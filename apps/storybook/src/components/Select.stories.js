import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Select } from '@fast-ai/ui-components';

storiesOf('Select', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Select />);
