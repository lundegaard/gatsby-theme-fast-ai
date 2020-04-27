import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Flex } from '@fast-ai/ui-components';
import { IntlContextConsumer } from 'gatsby-plugin-intl';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
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

const Page = ({ children }) => {
	const [menu, setMenu] = useState(true);
	const nav = useRef(null);

	return (
		<IntlContextConsumer>
			{({ originalPath }) => {
				const sublinks = getSublinks(links, originalPath);

				return (
					<Root>
						<Header hasSidebar={!!sublinks} links={links} menu={menu} setMenu={setMenu} />

						<Flex>
							{sublinks && <Sidebar menu={menu} setMenu={setMenu} nav={nav} links={sublinks} />}
							<Container
								fullwidth
								sx={{
									minHeight: 'calc(100vh - 64px)',
								}}
							>
								{children}
							</Container>
						</Flex>

						<Footer />
					</Root>
				);
			}}
		</IntlContextConsumer>
	);
};

Page.propTypes = { children: PropTypes.node };

export default Page;
