import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { Box, Flex, useBreakpoint, useTheme } from '@fast-ai/ui-components';

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
	const [menuVisibility, setMenuVisibility] = useState(false);
	const {
		grid: { gutters },
	} = useTheme();

	const nav = useRef(null);
	const shouldUseMobileNavigation = !useBreakpoint('md', 'up');

	const fullWidth =
		(!shouldUseMobileNavigation && fullWidthProp) ||
		(location && location.pathname === withPrefix('/'));

	const breadcrumbs = [
		{ to: '/', label: 'Home' },
		{ to: '/dr', label: 'Deep recommendation' },
	];

	return (
		<Root>
			<Header
				fullWidth={fullWidth}
				nav={nav}
				menuVisibility={menuVisibility}
				setMenuVisibility={setMenuVisibility}
				shouldUseMobileNavigation={shouldUseMobileNavigation}
			/>

			<Flex>
				{!fullWidth && (
					<Sidebar
						menuVisibility={menuVisibility}
						setMenuVisibility={setMenuVisibility}
						nav={nav}
						shouldUseMobileNavigation={shouldUseMobileNavigation}
						links={links}
					/>
				)}
				<ContentContainer fullWidth={fullWidth}>
					{!disableBreadcrumbs && (
						<Breadcrumbs
							sx={{
								position: 'absolute',
								top: '8px',
								left: gutters,
							}}
						>
							{breadcrumbs.map(({ to, label }, i) => (
								<Breadcrumb separatorSize={14} hideSeparator={i === 0} key={to}>
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
};

Page.propTypes = {
	children: PropTypes.node,
	disableBreadcrumbs: PropTypes.bool,
	fullWidth: PropTypes.bool,
	location: PropTypes.object,
};

export default Page;
