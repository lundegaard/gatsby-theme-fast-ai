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

const letterSpacings = ['-.5px', '0'];
letterSpacings.mono = letterSpacings[0];
letterSpacings.normal = letterSpacings[1];

const lightGray = '#e7e7e7';
const gray = '#b4b4b4';

const transparentStripesColor = color(lightGray);

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
	fonts: {
		body: 'Roboto',
		heading: 'Open Sans',
		mono: 'Roboto Mono',
	},
	breakpoints,
	space,
	fontSizes,
	buttons: {
		primary: {
			textTransform: 'uppercase',
			py: 3,
			'&:disabled, &[disabled]': {
				color: 'gray',
				opacity: 0.5,
			},
		},
	},
	colors: {
		background: '#f6f6f6',
		primary: '#0018ff',
		secondary: '#33d08e',
		muted: '#e7e7e7',
		contrast: '#ffffff',
		body: '#3b3b3b',
		danger: '#ff0000',
		gray,
		lightGray,
		highlight: 'hsla(205, 100%, 40%, 0.125)',
	},
	letterSpacings: ['-.5px', '0'],
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
			color: 'gray',
			'input:checked ~ *': {
				color: 'gray',
			},
			'input:focus ~ *': {
				color: 'gray',
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
			border: '1px solid',
			borderCollapse: 'collapse',
		},
		tableCol: {
			p: [1, 2],
			border: '1px solid',
			fontSize: [0, 1, 2],
			wordWrap: 'break-word',
			maxWidth: '240px',
		},
		tableRow: {
			border: '1px solid',
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
