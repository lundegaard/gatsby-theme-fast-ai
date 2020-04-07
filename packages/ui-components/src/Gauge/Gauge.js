import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';
import { Transition } from 'react-transition-group';

import Box from '../Box';
import Text from '../Text';
import { cos, sin } from '../utils/math';

const getCirmcumference = radius => 2 * radius * Math.PI;
const getArcCircumference = C => arcAngle => (arcAngle / 360) * C;

const coord = (x, y) => ({ x, y });
const equalCoord = x => ({ x, y: x });

const getArcProps = ({ radius, arcAngle }) => {
	const C = getCirmcumference(radius);
	const CArc = getArcCircumference(C)(arcAngle);

	const offset = C - CArc;

	return { CArc, C, offset };
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
		const valueNormalized = (value - min) / (max - min);

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
				<Text
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
				</Text>

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
						<linearGradient id="gradient-arc" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#33D08E" />
							<stop offset="33%" stopColor="#2AB0A2" />
							<stop offset="100%" stopColor="#0018FF" />
						</linearGradient>
					</defs>

					{title && <title>{title}</title>}

					<Text
						as="text"
						x={center.x - legend.x}
						y={center.y + legend.y}
						textAnchor="start"
						{...legendProps}
					>
						{formatLegend(min)}
					</Text>

					<Text
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
						stroke="url(#gradient-arc)"
						strokeDasharray={rimProps.C}
						strokeDashoffset={rimProps.offset}
						{...circleProps}
					/>
					<Transition
						in={inProp}
						timeout={{ enter: animationDuration, exit: animationDuration }}
						appear
					>
						{state => (
							<Box
								as="circle"
								cx={center.x}
								cy={center.y}
								r={radiusGauge}
								opacity={1 / 3}
								stroke="url(#gradient-arc)"
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
};
export default Gauge;
