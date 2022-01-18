import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@fast-ai/ui-components';

import Link from './Link';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export const BreadcrumbLink = ({ children, ...rest }) => (
	<Link variant="links.breadcrumb" {...rest}>
		{children}
	</Link>
);

BreadcrumbLink.propTypes = {
	children: PropTypes.node,
};

export const Breadcrumb = ({
	hideSeparator,
	separatorSize = 24,
	sx,
	children,
	...rest
}) => (
	<Box
		as="li"
		sx={{
			display: 'flex',
			alignItems: 'center',
			listStyle: 'none',
			mx: 0,
			p: 0,
			...sx,
		}}
		{...rest}
	>
		{!hideSeparator && <BreadcrumbSeparator size={separatorSize} />}
		{children}
	</Box>
);

Breadcrumb.propTypes = {
	children: PropTypes.node,
	hideSeparator: PropTypes.bool,
	separatorSize: PropTypes.number,
};

export const Breadcrumbs = ({ sx, ...rest }) => (
	<Box
		as="ul"
		sx={{ alignItems: 'center', display: 'flex', m: 0, p: 0, ...sx }}
		{...rest}
	/>
);
