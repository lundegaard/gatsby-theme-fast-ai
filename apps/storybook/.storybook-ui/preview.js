import React from 'react';
import { addDecorator, addParameters, configure } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';
import {
	Box,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from '@fast-ai/ui-components';

require('@fast-ai/ui-components/fonts/index.css');

addParameters({
	options: {
		theme: create({
			base: 'light',
			brandTitle: 'Components',
			brandUrl: '/',
		}),
		panelPosition: 'right',
		isFullscreen: false,
		isToolshown: true,
	},
});

addDecorator(withKnobs);

const theme = createTheme({});

const Root = (props) => (
	<Box
		variant="stripes"
		backgroundColor="background"
		sx={{
			fontFamily: 'body',
			p: 4,
		}}
		{...props}
	/>
);
addDecorator((story) => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Root>{story()}</Root>
	</ThemeProvider>
));

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);
