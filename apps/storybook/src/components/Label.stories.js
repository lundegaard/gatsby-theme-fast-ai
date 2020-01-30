import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Label } from '@fast-ai/ui-components';

storiesOf('Label', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Label />);
