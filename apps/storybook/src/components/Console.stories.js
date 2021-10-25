import React, { useEffect } from 'react';
import { Console, ConsoleProvider, useConsole } from '@fast-ai/ui-components';

export default {
	title: 'Console',
	description: '',
	component: Console,
};

const ConsoleConsumer = () => {
	const devConsole = useConsole();
	useEffect(() => {
		devConsole.replace({ foo: 'bar', a: 'b' });
		const id = setTimeout(() => {
			devConsole.log({ foo: 'bat' });
		}, 6000);
		return () => clearTimeout(id);
	}, [devConsole]);

	return <Console />;
};

export const groups = () => (
	<ConsoleProvider>
		<ConsoleConsumer />
	</ConsoleProvider>
);
