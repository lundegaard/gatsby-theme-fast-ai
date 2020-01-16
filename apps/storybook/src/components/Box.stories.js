import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Box } from '@fast-ai/ui-components';

storiesOf('Box', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Box />);
