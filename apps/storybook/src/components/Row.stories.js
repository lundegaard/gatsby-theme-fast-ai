import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Row } from '@fast-ai/ui-components';

storiesOf('Row', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Row />);
