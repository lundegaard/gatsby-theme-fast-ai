import React from 'react';
import { storiesOf } from '@storybook/react';
import { CssBaseline } from '@fast-ai/ui-components';

storiesOf('CssBaseline', module)
	.addParameters({ info: 'Adds basic CSS normalization.' })
	.add('in default', () => <CssBaseline />);
