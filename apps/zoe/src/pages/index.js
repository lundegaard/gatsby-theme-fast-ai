import React from 'react';
import { Page, Seo } from 'gatsby-theme-fast-ai';

import DemoForm from '../containers/DemoForm';

const Index = () => (
	<Page>
		<Seo title="Demo" />
		<DemoForm />
	</Page>
);

export default Index;
