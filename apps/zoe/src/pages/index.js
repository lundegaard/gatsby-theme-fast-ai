import React from 'react';
import { Page, Seo } from 'gatsby-theme-fast-ai';
import { DevConsole, DevConsoleProvider } from '@fast-ai/ui-components';

import DemoForm from '../containers/DemoForm';

const Index = () => (
	<DevConsoleProvider>
		<Page>
			<Seo title="Demo" />
			<DemoForm />
			<DevConsole title="zoe@lundegaard.ai:~ smartfeatures$" />
		</Page>
	</DevConsoleProvider>
);

export default Index;
