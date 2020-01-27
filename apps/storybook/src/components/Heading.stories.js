import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Heading } from '@lundegaard/ui-components';

storiesOf('Heading', module)
	.addDecorator(withKnobs)
	.addParameters({ info: ''})
	.add('in default', () => <Heading />);
