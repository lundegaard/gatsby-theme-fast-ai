import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Avatar } from '@fast-ai/ui-components';

storiesOf('Avatar', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Avatar />);
