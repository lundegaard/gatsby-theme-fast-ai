import React from 'react';
import PropTypes from 'prop-types';
import { IntlContextConsumer } from 'gatsby-plugin-intl';
import { Router as ReachRouter } from '@reach/router';
import { withPrefix } from 'gatsby';

const Noop = ({ children }) => children;
const Router = ({ language, children, ...rest }) => (
	<IntlContextConsumer>
		{intl => {
			const languageLink = language || intl.language;
			const path = '/';
			const pathWithLanguage =
				intl.routed || language ? `/${languageLink}${path}` : `${path}`;
			return (
				<ReachRouter {...rest}>
					<Noop path={withPrefix(pathWithLanguage)}>{children}</Noop>
				</ReachRouter>
			);
		}}
	</IntlContextConsumer>
);
Router.propTypes = {
	children: PropTypes.node,
	language: PropTypes.string,
};

export default Router;
