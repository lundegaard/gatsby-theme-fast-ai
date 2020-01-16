import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Col } from '@fast-ai/ui-components';

storiesOf('Col', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Col />);
