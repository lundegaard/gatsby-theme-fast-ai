import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@fast-ai/ui-components';

import useWebfonts from '../hooks/useWebfonts';

import Viewport from './Viewport';
import GatsbyCssBaseline from './GatsbyCssBaseline';

const webfontsConfig = [
	{ name: 'Open Sans', weight: 300 },
	{ name: 'Open Sans', weight: 400 },
	{ name: 'Open Sans', weight: 700 },
	{ name: 'Open Sans', weight: 800 },
	{ name: 'Roboto', weight: 400 },
	{ name: 'Roboto', weight: 500 },
	{ name: 'Roboto Mono', weight: 400 },
	{ name: 'Roboto Mono', weight: 500 },
];

const Layout = ({ theme, children }) => {
	const webfontsLoaded = useWebfonts(webfontsConfig);

	const themeWithResolvedFonts = useMemo(
		() =>
			webfontsLoaded
				? {
						...theme,
						fonts: {
							body: 'Roboto',
							heading: 'Open Sans',
							mono: 'Roboto Mono',
						},
				  }
				: theme,
		[theme, webfontsLoaded]
	);

	return (
		<Fragment>
			<Viewport />
			<ThemeProvider theme={themeWithResolvedFonts}>
				<GatsbyCssBaseline />
				{children}
			</ThemeProvider>
		</Fragment>
	);
};
Layout.propTypes = {
	children: PropTypes.node,
	theme: PropTypes.object,
};
export default Layout;
