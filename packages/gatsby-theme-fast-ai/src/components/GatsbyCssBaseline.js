import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline } from '@fast-ai/ui-components';

const GatsbyCssBaseline = ({ styles = '', ...rest }) => (
	<CssBaseline
		styles={`
			#___gatsby, #gatsby-focus-wrapper, div[role="group"][tabindex] {
			    min-height: 100%;
					height: 100%;
			}
			${styles}
			`}
		{...rest}
	/>
);

GatsbyCssBaseline.propTypes = {
	styles: PropTypes.string,
};

export default GatsbyCssBaseline;
