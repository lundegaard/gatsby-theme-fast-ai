import { createTheme } from '@fast-ai/ui-components';

const theme = createTheme({
	// replacing fonts with default ones, to load webfonts asynchronously
	fonts: {
		body: 'system-ui, sans-serif',
		heading: 'inherit',
		mono: 'Menlo, monospace',
	},
});

export default theme;
