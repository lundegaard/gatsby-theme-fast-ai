import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isNilOrEmpty } from 'ramda-extension';
import { Box, Flex } from '@fast-ai/ui-components';
import { IntlContextConsumer } from 'gatsby-plugin-intl';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ContentContainer from '../components/ContentContainer';
import { links } from '../links';
import { getSublinks } from '../utils';

const Root = (props) => (
	<Box
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

const Page = ({ children, location, fullWidth: fullWidthProp }) => {
	const [menu, setMenu] = useState(true);
	const nav = useRef(null);

	const fullWidth = fullWidthProp || (location && location.pathname === '/');

	return (
		<IntlContextConsumer>
			{({ originalPath }) => {
				const sublinks = getSublinks(links, originalPath);

				return (
					<Root>
						<Header
							fullWidth={fullWidth || isNilOrEmpty(sublinks)}
							nav={nav}
							menu={menu}
							setMenu={setMenu}
						/>

						<Flex>
							{!fullWidth && <Sidebar menu={menu} setMenu={setMenu} nav={nav} links={sublinks} />}
							<ContentContainer fullWidth={fullWidth}>{children}</ContentContainer>
						</Flex>

						<Footer />
					</Root>
				);
			}}
		</IntlContextConsumer>
	);
};

Page.propTypes = {
	children: PropTypes.node,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
};

export default Page;
