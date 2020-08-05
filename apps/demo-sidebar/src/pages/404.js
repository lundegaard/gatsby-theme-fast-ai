import React from 'react';
import { Heading } from '@fast-ai/ui-components';
import { Page, Seo } from 'gatsby-theme-fast-ai-sidebar';

const ErrorPage = (props) => (
	<Page {...props}>
		<Seo title="Error" />
		<Heading>Error</Heading>
	</Page>
);

export default ErrorPage;
