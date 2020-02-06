import preset from '@rebass/preset';
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

const getThumbStyles = color => ({
	color,
	width: ['18px', '18px', '24px'],
	height: ['18px', '18px', '24px'],
});

const getSliderStyles = color => ({
	height: '2px',
	color,
	'&:focus': {
		color,
	},
	'&::-ms-thumb': getThumbStyles(color),
	'&::-moz-range-thumb': getThumbStyles(color),
	'&::-webkit-slider-thumb': getThumbStyles(color),
});

const getStripesGradient = (width, alpha = 1) =>
	`repeating-linear-gradient(
		90deg, ${transparentStripesColor.setAlpha(alpha).toRgbString()},
		${transparentStripesColor.setAlpha(alpha).toRgbString()} 1px,
		transparent 1px,
		transparent ${width}
	)`;

const componentsPreset = {
	fonts: {
		body: 'Roboto',
		heading: 'Open Sans',
		mono: 'Roboto Mono',
	},
	breakpoints,
	space,
	fontSizes,
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
			...getSliderStyles('body'),
			danger: getSliderStyles('danger'),
			disabled: {
				cursor: 'default',
				...getSliderStyles('gray'),
			},
			default: getSliderStyles('secondary'),
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
			color: ['#fff', '#fff', 'inherit'],
			textTransform: 'uppercase',
			textDecoration: 'none',
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

export default userTheme =>
	mergeDeepRightAll([
		preset,
		componentsPreset,
		{ breakpointAliases: ['sm', 'md', 'lg', 'xl'] },
		userTheme,
	]);
