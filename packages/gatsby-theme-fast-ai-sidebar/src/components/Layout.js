import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@fast-ai/ui-components';
import { useStagedFonts } from '@fast-ai/gatsby-plugin-staged-fonts';

import Viewport from './Viewport';
import GatsbyCssBaseline from './GatsbyCssBaseline';

const Theme = ({ theme, ...rest }) => {
	const { isCriticalStage } = useStagedFonts();
	const themeWithResolvedFonts = useMemo(
		() => ({
			...theme,
			fonts: isCriticalStage
				? {
						body: 'Roboto Critical',
						heading: 'Open Sans Critical',
						mono: 'Roboto Mono Critical',
				  }
				: {
						body: 'Roboto',
						heading: 'Open Sans',
						mono: 'Roboto Mono',
				  },
		}),
		[theme, isCriticalStage]
	);
	return <ThemeProvider theme={themeWithResolvedFonts} {...rest} />;
};
Theme.propTypes = {
	theme: PropTypes.object,
};

const Layout = ({ theme, children }) => (
	<Fragment>
		<Viewport />
		<Theme theme={theme}>
			<GatsbyCssBaseline />
			{children}
		</Theme>
	</Fragment>
);

Layout.propTypes = {
	children: PropTypes.node,
	theme: PropTypes.object,
};

export default Layout;
