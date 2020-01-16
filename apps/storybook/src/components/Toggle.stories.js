import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Toggle } from '@fast-ai/ui-components';

storiesOf('Toggle', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Toggle />);
