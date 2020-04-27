import { createTheme } from '@fast-ai/ui-components';

const theme = createTheme({
	// replacing fonts with default ones, to load webfonts asynchronously
	fonts: {
		body: 'system-ui, sans-serif',
		heading: 'inherit',
		mono: 'Menlo, monospace',
	},
	links: {
		nav: {
			display: 'block',
			px: 2,
			py: 1,
			color: 'inherit',
			textDecoration: 'none',
			fontWeight: 'bold',
		},
	},
	hamburger: {
		closed: {
			backgroundColor: 'tranparent',
		},
		opened: {
			backgroundColor: 'tranparent',
		},
	},
	hamburgerBar: {
		closed: {
			backgroundColor: 'primary',
		},
		opened: {
			backgroundColor: 'primary',
		},
	},
	sidebar: {
		bg: ['white', 'transparent'],
	},
	variants: {
		nav: {
			color: 'inherit',
			p: 3,
			':hover,:focus,.active': {
				color: 'primary',
			},
		},
	},
});

export default theme;
