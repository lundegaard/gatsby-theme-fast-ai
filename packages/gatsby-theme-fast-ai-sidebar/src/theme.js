import { createTheme } from '@fast-ai/ui-components';

const sidebarCommon = {
	zIndex: 2,
	width: ['100%', '100%', 256, 256, 320],
	mt: [64, 64, 0],
	pb: 3,
	bg: ['contrast', 'contrast', 'transparent'],
	borderBottom: t => [t.borders.normal, t.borders.normal, 'none'],
};
const linksNav = {
	display: 'block',
	color: 'inherit',
	textDecoration: 'none',
};
const theme = createTheme({
	// replacing fonts with default ones, to load webfonts asynchronously
	fonts: {
		body: 'system-ui, sans-serif',
		heading: 'inherit',
		mono: 'Menlo, monospace',
	},
	links: {
		nav: {
			...linksNav,
			px: 2,
			py: 2,
		},
		toc: {
			...linksNav,
			py: 0,
		},
		tocActive: {
			...linksNav,
			py: 0,
			color: ['inherit', 'inherit', 'inherit', 'primary'],
		},

		breadcrumb: {
			whiteSpace: 'nowrap',
			color: 'inherit',
			textDecoration: 'none',
			':hover,:focus,.active': {
				color: 'primary',
			},
		},
		breadcrumbSm: {
			whiteSpace: 'nowrap',
			textDecoration: 'none',
			fontSize: [1, 0],
			color: 'gray.3',
			':hover,:focus,.active': {
				color: 'primary',
			},
		},
	},
	hamburger: {
		closed: {
			backgroundColor: 'transparent',
		},
		opened: {
			backgroundColor: 'transparent',
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
	variants: {
		toc: {
			heading: {
				fontWeight: 'normal',
				fontSize: [4],
				fontFamily: 'heading',
			},
			wrapper: {
				ul: {
					listStyle: 'none',
					padding: 0,
				},
				'li > ul > li > a': {
					pl: '24px',
				},
				'li > ul > li > ul > li > a': {
					pl: '32px',
				},
				'li > ul > li > ul > li > ul > li > a': {
					pl: '36px',
				},
				color: ['body', 'body', 'body', 'gray.3'],
				borderBottomColor: [
					'secondary',
					'secondary',
					'secondary',
					'transparent',
				],
				borderBottomStyle: 'solid',
				borderBottomWidth: '1px',
				py: [3, 3, 3, 0],
				mb: 4,
			},
		},
		sidebar: { ...sidebarCommon },
		'app-sidebar': { ...sidebarCommon, zIndex: 10000 },
		'sidebar-dock': {
			// backgroundColor: 'background',
			// backgroundColor: 'white',
			borderRight: t => t.borders.normal,
			p: 3,
			// borderLeft: t => t.borders.normal,
			//
			mr: t => t.grid.gutters,
			ml: t => t.grid.gutters.map(x => -x),
		},
		'app-bar': {
			height: 64,
		},
		'content-navigation': {
			height: 64,
			zIndex: 9999,
		},
		nav: {
			p: 3,
			':hover,:focus,.active': {
				color: 'primary',
			},
		},
		'logo-title': {
			color: 'gray.3',
			fontWeight: 'bold',
			pl: [1, 1, 2],
		},
		'main-nav': {
			maskImage:
				'linear-gradient(to right,transparent,white 0.5rem,white 98%,transparent)',
			alignItems: 'center',
			height: '100%',
			width: '100%',
			flexShrink: 1,
			flexGrow: 1,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			px: 2,
			mx: 2,
		},
		content: {
			minHeight: 'calc(100vh - 64px)',
			py: [4],
			px: [4],
		},
		highlighted: {
			lineHeight: 'body',
			fontSize: [2, 2, 2, 4],
		},
		highlightedToken: {},
	},
});

export default theme;
