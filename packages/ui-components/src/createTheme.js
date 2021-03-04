import preset from '@rebass/preset';
import { mergeDeepRight } from 'ramda';
import { mergeDeepRightAll } from 'ramda-extension';
import color from 'tinycolor2';

const fontSizes = [12, 14, 18, 20, 22, 24, 27, 36, 49, 85];
const space = [0, 4, 8, 16, 32, 64, 96, 128, 256];

const breakpoints = ['40em', '52em', '76em'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];

const letterSpacings = {
	tighter: '-0.05em',
	tight: '-0.025em',
	mono: '-0.025em',
	normal: '0',
	wide: '0.025em',
	wider: '0.05em',
	widest: '0.1em',
};
const fontWeights = { body: 400, heading: 700, bold: 700 };

const gray = [null, '#e7e7e7', '#b4b4b4', '#737373'];

const colors = {
	background: '#f6f6f6',
	primary: '#0018ff',
	secondary: '#33d08e',
	contrast: '#ffffff',
	body: '#3b3b3b',
	danger: '#ff0000',
	success: '#00ff00',
	gray,
	muted: gray[1],
	highlight: 'hsla(205, 100%, 40%, 0.125)',
};

const commonHeadingProps = {
	fontFamily: 'heading',
	fontWeight: 'heading',
	letterSpacing: 'tighter',
	pt: [5],
};

const transparentStripesColor = color(colors.gray[1]);

const getStripesGradient = (width, alpha = 1) =>
	`repeating-linear-gradient(
		90deg, ${transparentStripesColor.setAlpha(alpha).toRgbString()},
		${transparentStripesColor.setAlpha(alpha).toRgbString()} 1px,
		transparent 1px,
		transparent ${width}
	)`;

const commonSliderProps = {
	handle: {
		width: ['18px', '18px', '18px', '24px'],
		height: ['18px', '18px', '18px', '24px'],
		borderRadius: '50%',
		backgroundColor: 'secondary',
	},
	handleTouch: {
		backgroundColor: 'none',
		cursor: 'pointer',
		WebkitTapHighlightColor: 'rgba(0,0,0,0)',
		zIndex: 5,
		width: 28,
		height: 42,
	},
	track: {
		backgroundColor: 'secondary',
		borderRadius: '1000px',
		cursor: 'pointer',
		height: '2px',
	},
	rail: {
		cursor: 'pointer',
		backgroundColor: 'muted',
		height: '2px',
	},
};

const componentsPreset = {
	useCustomProperties: true,
	fonts: {
		body: 'Roboto',
		heading: 'Open Sans',
		mono: 'Roboto Mono',
	},
	breakpoints,
	fontWeights,
	space,
	fontSizes,
	buttons: {
		primary: {
			textTransform: 'uppercase',
			py: 3,
			'&:disabled, &[disabled]': {
				color: 'gray.2',
				opacity: 0.5,
			},
		},
		secondary: {
			bg: 'secondary',
			color: 'background',
			variant: 'buttons.primary',
		},
		outline: {
			bg: 'transparent',
			boxShadow: 'inset 0 0 2px',
			color: 'primary',
			variant: 'buttons.primary',
		},
	},
	radii: { default: 4, circle: 99999 },
	colors,
	letterSpacings,
	text: {
		body: {
			fontFamily: 'body',
			lineHeight: 'body',
			fontSize: [2, 2, 2, 4],
		},
		heading: {
			...commonHeadingProps,
			fontSize: [7, 7, 8, 9],
			mt: [0],
			mb: [2, 2, 4, 5],
			pt: [0],
		},
		subHeading1: {
			...commonHeadingProps,
			fontSize: [3, 4, 7],
			mb: [3, 3],
		},
		subHeading2: {
			...commonHeadingProps,
			fontSize: [4, 5, 6],
			mb: [2, 2],
		},
		subHeading3: {
			...commonHeadingProps,
			fontSize: [3, 4, 4],
			mb: [2, 2],
		},
		subHeading4: {
			...commonHeadingProps,
			fontSize: [3, 4, 4],
			fontWeight: 'normal',
			mb: [3, 3],
		},
		subHeading5: {
			...commonHeadingProps,
			variant: 'heading',
			fontWeight: 'bold',
			fontSize: [2, 2, 2, 2],
			mb: [1, 1],
		},
	},
	forms: {
		input: {
			fontFamily: 'body',
		},
		checkbox: {
			'input:checked ~ &': {
				color: 'secondary',
			},
			'input:focus ~ &': {
				color: 'secondary',
			},
		},
		label: {
			color: 'inherit',
		},
		switch: {
			thumb: 'secondary',
		},
		slider: {
			...commonSliderProps,
			disabled: mergeDeepRight(commonSliderProps, {
				handle: {
					backgroundColor: 'muted',
				},
				track: {
					backgroundColor: 'muted',
				},
			}),
			danger: mergeDeepRight(commonSliderProps, {
				handle: {
					backgroundColor: 'danger',
				},

				track: {
					backgroundColor: 'danger',
				},
			}),
		},
		radio: {
			'input:checked ~ &': {
				color: 'secondary',
			},
			'input:focus ~ &': {
				color: 'secondary',
			},
		},
	},
	grid: {
		maxColumns: 12,
		gutters: [1, 2, 2, 3],
	},
	gauge: {
		gradient: [
			['0%', '#33D08E'], //
			['33%', '#2AB0A2'],
			['100%', '#0018FF'],
		],
		danger: {
			gradient: [
				['0%', colors.danger],
				['33%', colors.danger],
				['100%', '#33D08E'], //
			],
		},
		revert: {
			gradient: [
				['0%', '#0018FF'],
				['33%', '#2AB0A2'],
				['100%', '#33D08E'], //
			],
		},
	},
	hamburger: {
		closed: {
			backgroundColor: 'tranparent',
		},
		opened: {
			backgroundColor: 'primary',
		},
	},
	hamburgerBar: {
		closed: {
			backgroundColor: 'primary',
		},
		opened: {
			backgroundColor: 'background',
		},
	},
	variants: {
		danger: {
			color: 'danger',
			'input:checked ~ *': {
				color: 'danger',
			},
			'input:focus ~ *': {
				color: 'danger',
			},
		},
		disabled: {
			color: 'gray.2',
			'input:checked ~ *': {
				color: 'gray.2',
			},
			'input:focus ~ *': {
				color: 'gray.2',
			},
		},
		secondary: {
			color: 'secondary',
		},
		stripes: {
			backgroundImage: [
				getStripesGradient('25%'),
				getStripesGradient('17%'),
				getStripesGradient('10%'),
			],
		},
		transparentStripes: {
			backgroundImage: [
				getStripesGradient('25%', 0.2),
				getStripesGradient('17%', 0.2),
				getStripesGradient('10%', 0.2),
			],
		},
		nav: {
			transition: 'color .175s ease-in-out',
			fontSize: 2,
			fontWeight: 'bold',
			fontFamily: 'heading',
			display: 'inline-block',
			p: [3, 3, 0],
			textTransform: 'uppercase',
			textDecoration: 'none',
			whiteSpace: 'nowrap',
			color: ['#fff', '#fff', 'inherit'],
			':hover,:focus,.active': {
				color: ['#fff', '#fff', 'primary'],
			},
		},
		table: {
			overflowX: 'auto',
			borderColor: 'transparent',
			borderCollapse: 'collapse',
			minWidth: '100%',
			tr: {
				border: 'none',
				'&:hover td': {
					bg: 'white',
				},
				td: {
					bg: 'background',
				},
				'&:nth-of-type(2n) td': {
					bg: 'gray.1',
				},
				'&:nth-of-type(2n):hover td': {
					bg: 'white',
				},
			},
			th: {
				fontSize: [3, 4, 5],
			},
		},
		tableCol: {
			px: [1, 2],
			py: 2,
			fontSize: [0, 1, 2],
			maxWidth: '400px',
			wordWrap: 'break-word',
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: 'gray.2',
		},
		tableHeader: {
			variant: 'variants.tableCol',
			py: [2, 4],
			borderBottomWidth: '2px',
			borderBottomStyle: 'solid',
			borderBottomColor: 'gray.3',
			textAlign: 'left',
		},
		tableRow: {
			borderTopWidth: '1px',
			borderTopStyle: 'solid',
			borderTopColor: 'gray.2',
		},
		links: {
			color: 'primary',
			':hover,:focus,.active': {
				color: 'primary',
			},
		},
		container: {
			maxWidth: ['none', '40em', '52em', '76em'],
		},
		containerFluid: {
			maxWidth: 'none',
		},
	},
};

const createTheme = (userTheme) =>
	mergeDeepRightAll([
		preset,
		componentsPreset,
		{ breakpointAliases: ['sm', 'md', 'lg', 'xl'] },
		userTheme,
	]);

export default createTheme;
