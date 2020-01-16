import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Icon } from '@fast-ai/ui-components';

storiesOf('Icon', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Icon />);
