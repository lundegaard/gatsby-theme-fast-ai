import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Link } from '@fast-ai/ui-components';

storiesOf('Link', module)
	.addDecorator(withKnobs)
	.addParameters({ info: '' })
	.add('in default', () => <Link />);
