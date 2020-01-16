import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Field } from 'react-powerplug';
import { Icon, TextInput } from '@fast-ai/ui-components';

storiesOf('TextInput', module)
	.addDecorator(withKnobs)
	.add('in default', () => (
		<Field>
			{({ bind }) => <TextInput label="Generic Input" name="generic-input" {...bind} />}
		</Field>
	))
	.add('with error', () => (
		<Field>
			{({ bind }) => (
				<TextInput label="Generic Input" error="Error!" name="generic-input" {...bind} />
			)}
		</Field>
	))
	.add('disabled', () => (
		<Field>
			{({ bind }) => <TextInput disabled label="Generic Input" name="generic-input" {...bind} />}
		</Field>
	))
	.add('with Icon suffix', () => (
		<Field>
			{({ bind }) => (
				<TextInput
					suffix={<Icon type="success-circle" size={22} />}
					label="Generic Input"
					name="generic-input"
					{...bind}
				/>
			)}
		</Field>
	));
