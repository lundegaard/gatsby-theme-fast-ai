import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Hamburger } from '@fast-ai/ui-components';

storiesOf('Hamburger', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Hamburger />);
