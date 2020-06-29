import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { clamp, filter, identity, join, o, path } from 'ramda';
import { Transition } from 'react-transition-group';

import useTheme from '../hooks/useTheme';
import Box from '../Box';
import Text from '../Text';
import { cos, sin } from '../utils/math';

const joinWithDash = o(join('-'), filter(Boolean));
const getCirmcumference = (radius) => 2 * radius * Math.PI;
const getArcCircumference = (C) => (arcAngle) => (arcAngle / 360) * C;

const coord = (x, y) => ({ x, y });
const equalCoord = (x) => ({ x, y: x });

const getArcProps = ({ radius, arcAngle }) => {
	const C = getCirmcumference(radius);
	const CArc = getArcCircumference(C)(arcAngle);

	const offset = C - CArc;

	return { CArc, C, offset };
};

export const SvgGradient = ({ variant, ...rest }) => {
	const theme = useTheme();
	const gradient = path(['gauge', variant, 'gradient'].filter(Boolean))(theme);

	return (
		<linearGradient x1="0%" y1="0%" x2="100%" y2="0%" {...rest}>
			{gradient.map(([offset, stopColor]) => (
				<stop key={`${offset}-${stopColor}`} {...{ offset, stopColor }} />
			))}
		</linearGradient>
	);
};

SvgGradient.propTypes = {
	variant: PropTypes.string,
};

const Gauge = forwardRef(
	(
		{
			arcAngle = 240,
			animationDuration = 1000,
			size = 256,
			rimStrokeWidth = 1,
			gaugeStrokeWidth = 4,
			value = 0,
			valueProps,
			min = 0,
			max = 1,
			format = identity,
			formatLegend = identity,
			title,
			legendProps: legendPropsProp,
			variant,
			...rest
		},
		ref
	) => {
		// hack to run animation after mount
		const [inProp, setInProp] = useState(false);
		useEffect(() => {
			setInProp(true);
		}, []);

		const svgSize = 32;

		// Angle between horizontal axis and the start of gauge
		const alpha = (arcAngle - 180) / 2;

		// Labels needs to be moved a bit
		const alphaLabels = alpha + 10;

		// We need to move SVG Circle's zero angle
		// so the gauge stroke is visually symmetric.
		const rotateForSymmetryAngle = -alpha - 180;

		// Normalized value between 0-1
		const valueNormalized = clamp(0, 1)((value - min) / (max - min));

		// Coords of center of the canvas
		const center = equalCoord(svgSize / 2);

		const radiusRim = center.x - rimStrokeWidth / 2;
		const radiusGauge = center.x - (rimStrokeWidth + gaugeStrokeWidth / 2);

		const rimProps = getArcProps({ radius: radiusRim, arcAngle });
		const gaugeProps = getArcProps({ radius: radiusGauge, arcAngle: arcAngle * valueNormalized });

		const circleProps = {
			transform: `rotate(${rotateForSymmetryAngle} ${center.x} ${center.y})`,
		};

		const legendProps = {
			fill: '#000000',
			stroke: 'none',
			fontSize: '2px',
			...legendPropsProp,
		};

		const legend = coord(radiusRim * cos(alphaLabels), radiusRim * sin(alphaLabels));

		const transitionStyles = {
			entering: { strokeDashoffset: gaugeProps.offset },
			entered: { strokeDashoffset: gaugeProps.offset },
			exiting: { strokeDashoffset: gaugeProps.C },
			exited: { strokeDashoffset: gaugeProps.C },
		};

		const gradientId = joinWithDash(['gradient-arc', variant]);

		return (
			<Box
				ref={ref}
				__css={{
					position: 'relative',
					width: `${size}px`,
					height: `${size}px`,
				}}
				{...rest}
			>
				<Box
					mt={0}
					mb={0}
					fontSize={8}
					__css={{
						whiteSpace: 'nowrap',
						transform: 'translate(-50%, -50%)',
						position: 'absolute',
						left: '50%',
						top: '50%',
					}}
					{...valueProps}
				>
					{format(value)}
				</Box>

				<Box
					as="svg"
					viewBox={`0 0 ${svgSize} ${svgSize}`}
					width={size}
					height={size}
					fill="none"
					stroke="currentcolor"
					role="img"
					aria-valuenow={value}
					aria-valuemin={min}
					aria-valuemax={max}
					__css={{
						color: 'primary',
					}}
				>
					<defs>
						<SvgGradient variant={variant} id={gradientId} />
					</defs>

					{title && <title>{title}</title>}

					<Text
						variant=""
						as="text"
						x={center.x - legend.x}
						y={center.y + legend.y}
						textAnchor="start"
						{...legendProps}
					>
						{formatLegend(min)}
					</Text>

					<Text
						variant=""
						as="text"
						x={center.x + legend.x}
						y={center.y + legend.y}
						textAnchor="end"
						{...legendProps}
					>
						{formatLegend(max)}
					</Text>

					<circle
						strokeWidth={rimStrokeWidth}
						opacity={4 / 5}
						cx={center.x}
						cy={center.y}
						r={radiusRim}
						stroke={`url(#${gradientId})`}
						strokeDasharray={rimProps.C}
						strokeDashoffset={rimProps.offset}
						{...circleProps}
					/>
					<Transition
						in={inProp}
						timeout={{ enter: animationDuration, exit: animationDuration }}
						appear
					>
						{(state) => (
							<Box
								as="circle"
								cx={center.x}
								cy={center.y}
								r={radiusGauge}
								opacity={1 / 3}
								stroke={`url(#${gradientId})`}
								strokeWidth={gaugeStrokeWidth}
								strokeDasharray={gaugeProps.C}
								__css={{
									transition: `stroke-dashoffset ${animationDuration}ms cubic-bezier(0, 0, 0.2, 1)`,
								}}
								{...transitionStyles[state]}
								{...circleProps}
							/>
						)}
					</Transition>
				</Box>
			</Box>
		);
	}
);

Gauge.displayName = 'Gauge';

Gauge.propTypes = {
	animationDuration: PropTypes.number,
	arcAngle: PropTypes.number,
	format: PropTypes.func,
	formatLegend: PropTypes.func,
	gaugeStrokeWidth: PropTypes.number,
	legendProps: PropTypes.object,
	max: PropTypes.number,
	min: PropTypes.number,
	rimStrokeWidth: PropTypes.number,
	size: PropTypes.number,
	title: PropTypes.string,
	value: PropTypes.number,
	valueProps: PropTypes.object,
	variant: PropTypes.string,
};
export default Gauge;
