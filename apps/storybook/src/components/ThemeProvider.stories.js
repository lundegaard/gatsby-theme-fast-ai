import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { ThemeProvider } from '@fast-ai/ui-components';

storiesOf('ThemeProvider', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <ThemeProvider />);
