import React from 'react';
import { Page, Seo } from 'gatsby-theme-fast-ai-sidebar';
import { Heading } from '@fast-ai/ui-components';

const Index = props => (
	<Page fullWidth {...props}>
		<Seo title="Home" />

		<Heading>Welcome</Heading>
	</Page>
);

export default Index;
