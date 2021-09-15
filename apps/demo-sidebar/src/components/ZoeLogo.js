import React, { memo } from 'react';
import { Image } from '@fast-ai/ui-components';
import { keyframes } from '@emotion/core';

import logoSrc from '../../content/assets/zoe-ai-logo.svg';

const jumpInFromTop = keyframes`
	0% {
		transform: translateY(-200px) scaleY(2.5) scaleX(.2);
		transform-origin: 50% 0%;
		filter: blur(40px);
		opacity: 0;
	}
	100% {
		transform: translateY(0) scaleY(1) scaleX(1);
		transform-origin: 50% 50%;
		filter: blur(0);
		opacity: 1;
	}
}
`;

const easing = 'cubic-bezier(.455, .030, .515, .955)';

const ZoeLogo = props => (
	<Image
		height={[35, 35, 46]}
		title="Zoe.ai - Behavioral Scoring"
		alt="Zoe.ai logo"
		src={logoSrc}
		sx={{
			position: 'relative',
			animationName: jumpInFromTop,
			animationDuration: '.5s',
			animationTimingFunction: easing,
			animationFillMode: 'both',
			animationDelay: '.75s',
		}}
		{...props}
	/>
);

export default memo(ZoeLogo);
