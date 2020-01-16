import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { AvatarLink } from '@fast-ai/ui-components';

storiesOf('AvatarLink', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <AvatarLink />);
