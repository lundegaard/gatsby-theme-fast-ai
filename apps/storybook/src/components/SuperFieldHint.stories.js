import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { SuperFieldHint } from '@fast-ai/ui-components';

storiesOf('SuperFieldHint', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <SuperFieldHint />);
