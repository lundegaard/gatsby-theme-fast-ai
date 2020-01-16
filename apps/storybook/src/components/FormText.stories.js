import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { FormText } from '@fast-ai/ui-components';

storiesOf('FormText', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <FormText />);
