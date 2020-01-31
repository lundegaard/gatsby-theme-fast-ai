import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { SuperFieldLabel } from '@fast-ai/ui-components';

storiesOf('SuperFieldLabel', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <SuperFieldLabel />);
