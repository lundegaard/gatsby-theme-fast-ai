import React from 'react';
import FreshLogo from 'gatsby-theme-fast-ai/src/components/Logo';

import logoSrc from '../../../content/assets/zoe-ai-logo.svg';

const Logo = props => (
	<FreshLogo
		height={[35, 35, 46]}
		title="Zoe.ai - Behavioral Scoring"
		alt="Zoe.ai logo"
		src={logoSrc}
		{...props}
	/>
);

export default Logo;
