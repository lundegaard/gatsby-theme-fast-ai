import React, { Fragment, forwardRef } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { Slider as CompoundSlider, Handles, Rail, Tracks } from 'react-compound-slider';
import { isNotNil } from 'ramda-extension';

import Box from '../Box';

const Handle = ({
	domain: [min, max],
	handle: { id, value, percent },
	variant,
	getHandleProps,
}) => (
	<Fragment>
		<Box
			sx={{
				left: `${percent}%`,
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
				WebkitTapHighlightColor: 'rgba(0,0,0,0)',
				zIndex: 5,
				width: 28,
				height: 42,
				cursor: 'pointer',
				backgroundColor: 'none',
			}}
			{...getHandleProps(id)}
		/>
		<Box
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			sx={{
				left: `${percent}%`,
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
				zIndex: 2,
				width: 24,
				height: 24,
				borderRadius: '50%',
				backgroundColor:
					variant === 'disabled' ? 'muted' : variant === 'danger' ? 'danger' : 'secondary',
			}}
		/>
	</Fragment>
);

Handle.propTypes = {
	domain: PropTypes.arrayOf(PropTypes.number).isRequired,
	getHandleProps: PropTypes.func.isRequired,
	handle: PropTypes.shape({ id: PropTypes.any, value: PropTypes.any, percent: PropTypes.number })
		.isRequired,
	variant: PropTypes.oneOf(['danger', 'disabled']),
};

const Track = ({ source, target, getTrackProps, variant }) => (
	<Box
		sx={{
			position: 'absolute',
			transform: 'translate(0%, -50%)',
			height: '2px',
			zIndex: 1,
			backgroundColor:
				variant === 'disabled' ? 'muted' : variant === 'danger' ? 'danger' : 'secondary',
			borderRadius: '1000px',
			cursor: 'pointer',
			left: `${source.percent}%`,
			width: `${target.percent - source.percent}%`,
		}}
		{...getTrackProps()}
	/>
);

Track.propTypes = {
	getTrackProps: PropTypes.func.isRequired,
	source: PropTypes.shape({ percent: PropTypes.number.isRequired }),
	target: PropTypes.shape({ percent: PropTypes.number.isRequired }),
	variant: PropTypes.oneOf(['danger', 'disabled']),
};

const SliderRail = ({ getRailProps }) => (
	<Box
		sx={{
			position: 'absolute',
			width: '100%',
			transform: 'translate(0%, -50%)',
			cursor: 'pointer',
			backgroundColor: 'muted',
			height: '2px',
		}}
		{...getRailProps()}
	/>
);
SliderRail.propTypes = {
	getRailProps: PropTypes.func.isRequired,
};

const Slider = forwardRef(
	({ disabled, step = 1, min, variant, max, onChange, onUpdate, value, ...rest }, ref) => {
		invariant(isNotNil(min), '`min` is required for Slider component');
		invariant(isNotNil(max), '`max` is required for Slider component');

		const domain = [min, max];
		return (
			<CompoundSlider
				mode={1}
				step={step}
				domain={domain}
				rootStyle={{
					position: 'relative',
					width: '100%',
					touchAction: 'none',
				}}
				onUpdate={onUpdate}
				onChange={onChange}
				values={value}
				disabled={disabled}
				ref={ref}
				{...rest}
			>
				<Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>

				<Handles>
					{({ handles, getHandleProps }) => (
						<Fragment>
							{handles.map((handle) => (
								<Handle
									variant={variant}
									key={handle.id}
									handle={handle}
									domain={domain}
									disabled={disabled}
									getHandleProps={getHandleProps}
								/>
							))}
						</Fragment>
					)}
				</Handles>

				<Tracks right={false} left={false}>
					{({ tracks, getTrackProps }) => (
						<Fragment>
							{tracks.map(({ id, source, target }) => (
								<Track
									variant={variant}
									key={id}
									source={source}
									target={target}
									getTrackProps={getTrackProps}
								/>
							))}
						</Fragment>
					)}
				</Tracks>
			</CompoundSlider>
		);
	}
);
Slider.displayName = 'Slider';
Slider.propTypes = {
	disabled: PropTypes.bool,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	onUpdate: PropTypes.func,
	step: PropTypes.any,
	value: PropTypes.any,
	variant: PropTypes.oneOf(['danger', 'disabled']),
};

export default Slider;
