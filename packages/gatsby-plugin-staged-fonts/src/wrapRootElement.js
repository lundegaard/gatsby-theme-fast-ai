import React from 'react';

import StagedFontsProvider from './StagedFontsProvider';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }, pluginOptions) => (
	<StagedFontsProvider pluginOptions={pluginOptions}>
		{element}
	</StagedFontsProvider>
);
