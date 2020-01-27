import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Heading } from '@fast-ai/ui-components';

storiesOf('Heading', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Heading />);
