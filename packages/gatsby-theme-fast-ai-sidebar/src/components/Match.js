import React from 'react';
import PropTypes from 'prop-types';
import { IntlContextConsumer } from 'gatsby-plugin-intl';
import { Match as RouterMatch } from '@reach/router';
import { withPrefix } from 'gatsby';
import { path } from 'ramda';

import { goUpPath } from '../utils';

import * as types from './types';

const Match = ({ path, language, ...rest }) => (
	<IntlContextConsumer>
		{intl => {
			const languageLink = language || intl.language;
			const pathWithLanguage =
				intl.routed || language ? `/${languageLink}${path}` : `${path}`;

			return <RouterMatch path={withPrefix(pathWithLanguage)} {...rest} />;
		}}
	</IntlContextConsumer>
);

Match.propTypes = { language: PropTypes.string, path: PropTypes.string };

export default Match;

export const getParent = link => {
	const { to } = link;

	const isNotRoot = path(['children', 0, 'to'], link) === to;
	return isNotRoot ? goUpPath(to) : to;
};

export const MatchParent = ({ link, children }) => (
	<Match key={link.to} path={`${getParent(link)}/*`}>
		{children}
	</Match>
);

MatchParent.propTypes = {
	children: PropTypes.elementType,
	link: PropTypes.shape(types.NavigationRoute),
};
