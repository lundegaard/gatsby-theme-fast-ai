import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Image } from '@fast-ai/ui-components';

storiesOf('Image', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Image />);
