import React from 'react';
import { Page, Seo } from 'gatsby-theme-fast-ai-sidebar';
import { Container, Heading } from '@fast-ai/ui-components';

const Index = props => (
	<Page {...props}>
		<Seo title="Home" />

		<Container>
			<Heading>Welcome!</Heading>
		</Container>
	</Page>
);
export default Index;
