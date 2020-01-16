import React from 'react';
import { FormattedMessage, Page, Seo } from 'gatsby-theme-fast-ai';

const Index = () => (
	<Page>
		<Seo title="Demo" />
		<FormattedMessage id="home.title" />
	</Page>
);

export default Index;
