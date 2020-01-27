import React from 'react';
import { CssBaseline } from '@fast-ai/ui-components';

const GatsbyCssBaseline = () => (
	<CssBaseline
		styles={`
			#___gatsby, div[role="group"][tabindex] {
			    min-height: 100%;
			}
			`}
	/>
);

export default GatsbyCssBaseline;
