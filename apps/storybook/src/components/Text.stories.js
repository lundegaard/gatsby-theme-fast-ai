import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Text } from '@fast-ai/ui-components';

storiesOf('Text', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Text />);
