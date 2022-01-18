import React from 'react';
import { Box, Container } from '@fast-ai/ui-components';

const ContentContainer = props => (
	<Container sx={{ position: 'relative' }}>
		<Box variant="content" {...props} />
	</Container>
);

export default ContentContainer;
