import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Container } from '@fast-ai/ui-components';

storiesOf('Container', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Container />);
