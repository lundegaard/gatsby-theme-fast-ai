import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { isNilOrEmpty } from 'ramda-extension';
import { Box, Flex, useTheme } from '@fast-ai/ui-components';
import { IntlContextConsumer } from 'gatsby-plugin-intl';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import {
	Breadcrumb,
	BreadcrumbLink,
	Breadcrumbs,
} from '../components/Breadcrumbs';
import ContentContainer from '../components/ContentContainer';
import { links } from '../links';
import { getSublinks } from '../utils';

const Root = props => (
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

const Page = ({
	children,
	location,
	disableBreadcrumbs,
	fullWidth: fullWidthProp,
}) => {
	const [menuVisibility, setMenuVisibility] = useState(true);
	const {
		grid: { gutters },
	} = useTheme();

	const nav = useRef(null);

	const fullWidth =
		fullWidthProp || (location && location.pathname === withPrefix('/'));

	const breadcrumbs = [
		{ to: '/', label: 'Home' },
		{ to: '/dr', label: 'Deep recommendation' },
	];

	return (
		<IntlContextConsumer>
			{({ originalPath }) => {
				const sublinks = getSublinks(links, originalPath);

				return (
					<Root>
						<Header
							fullWidth={fullWidth || isNilOrEmpty(sublinks)}
							nav={nav}
							menuVisibility={menuVisibility}
							setMenuVisibility={setMenuVisibility}
						/>

						<Flex>
							{!fullWidth && (
								<Sidebar
									menuVisibility={menuVisibility}
									setMenuVisibility={setMenuVisibility}
									nav={nav}
									links={sublinks}
								/>
							)}
							<ContentContainer fullWidth={fullWidth}>
								{!disableBreadcrumbs && (
									<Breadcrumbs
										sx={{
											position: 'absolute',
											top: '8px',
											left: gutters,
											width: '100%',
										}}
									>
										{breadcrumbs.map(({ to, label }, i) => (
											<Breadcrumb
												separatorSize={14}
												hideSeparator={i === 0}
												key={to}
											>
												<BreadcrumbLink variant="links.breadcrumbSm" to="to">
													{label}
												</BreadcrumbLink>
											</Breadcrumb>
										))}
									</Breadcrumbs>
								)}
								{children}
							</ContentContainer>
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
	disableBreadcrumbs: PropTypes.bool,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
};

export default Page;
