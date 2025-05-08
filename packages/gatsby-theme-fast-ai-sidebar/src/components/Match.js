import React from 'react';
import PropTypes from 'prop-types';
import { IntlContextConsumer } from 'gatsby-plugin-intl';
import { Match as RouterMatch, match as matchPath } from '@reach/router';
import { withPrefix } from 'gatsby';
import { findIndex } from 'ramda';

import { goUpPath } from '../utils';

import * as types from './types';

export const Match = ({ path, language, ...rest }) => (
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
	const { to, children = [] } = link;
	let rootPath = to;
	if (children.length > 1) {
		const indexPageIndex = findIndex(child => child.to === to, children);
		const nonIndexPageIndex = findIndex(child => child.to !== to, children);

		if (indexPageIndex !== -1 && nonIndexPageIndex !== -1) {
			rootPath = matchPath(`${to}/*`, children[nonIndexPageIndex].to)
				? to
				: goUpPath(to);
		}
	}
	return rootPath;
};

export const MatchParent = ({ link, ...rest }) => (
	<Match key={link.to} path={`${getParent(link)}/*`} {...rest} />
);

MatchParent.propTypes = {
	link: types.NavigationRoute.isRequired,
};
