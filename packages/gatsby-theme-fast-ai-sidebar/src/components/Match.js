import React from 'react';
import PropTypes from 'prop-types';
import { IntlContextConsumer } from 'gatsby-plugin-intl';
import { Match as RouterMatch } from '@reach/router';

const Match = ({ path, language, ...rest }) => (
	<IntlContextConsumer>
		{(intl) => {
			const languageLink = language || intl.language;
			const pathWithLanguage =
				intl.routed || language ? `/${languageLink}${path}` : `${path}`;

			return <RouterMatch path={pathWithLanguage} {...rest} />;
		}}
	</IntlContextConsumer>
);

Match.propTypes = { language: PropTypes.string, path: PropTypes.string };

export default Match;
