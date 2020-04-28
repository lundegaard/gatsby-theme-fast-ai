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
		'main-nav': {
			maskImage: 'linear-gradient(to right,transparent,white 0.5rem,white 98%,transparent)',
			alignItems: 'center',
			height: '100%',
			width: '100%',
			flexShrink: 1,
			flexGrow: 1,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			mx: 2,
		},
		header: {
			backgroundColor: 'white',
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: 'muted',
		},
		'header-fullwidth': {
			backgroundColor: 'transparent',
		},
		content: {
			minHeight: 'calc(100vh - 64px)',
			py: [4, 6],
		},
	},
});

export default theme;
