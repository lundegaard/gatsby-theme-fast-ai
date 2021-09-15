import React from 'react';
import { Box, Container } from '@fast-ai/ui-components';

const ContentContainer = props => (
	<Container>
		<Box variant="content" {...props} />
	</Container>
);

export default ContentContainer;
