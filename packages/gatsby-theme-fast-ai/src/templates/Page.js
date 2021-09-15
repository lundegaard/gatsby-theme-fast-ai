import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@fast-ai/ui-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';

const Root = props => (
	<Flex
		variant="stripes"
		backgroundColor="background"
		sx={{
			fontFamily: 'body',
			minHeight: '100vh',
			height: '100%',
			color: 'body',
		}}
		{...props}
	/>
);

const Page = ({ children }) => (
	<Root flexDirection="column">
		<Header />
		<Content flexGrow="1">{children}</Content>
		<Footer />
	</Root>
);

Page.propTypes = { children: PropTypes.node };

export default Page;
