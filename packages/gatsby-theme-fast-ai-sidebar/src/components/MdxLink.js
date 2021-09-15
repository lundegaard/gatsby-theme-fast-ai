import React from 'react';
import PropTypes from 'prop-types';
import { Link as ComponentsLink } from '@fast-ai/ui-components';
import { withPrefix } from 'gatsby';
import { Link as IntlLink } from 'gatsby-plugin-intl';
import { allPass, complement, o, prop } from 'ramda';
import { startsWithPrefix } from 'ramda-extension';

const defaultIsInternalLink = o(
	allPass([
		complement(startsWithPrefix('http')),
		complement(startsWithPrefix('#')),
	]),
	prop('href'),
);

const MdxLink = ({ href, isInternalLink = defaultIsInternalLink, ...rest }) => {
	if (isInternalLink({ href, ...rest })) {
		const noPrefix = withPrefix('/') === '/';

		const to = noPrefix
			? href
			: href.replace(new RegExp(`^${withPrefix('/')}`), '/');

		return <IntlLink to={to} {...rest} />;
	}

	return <ComponentsLink href={href} {...rest} />;
};

MdxLink.propTypes = {
	href: PropTypes.string,
	isInternalLink: PropTypes.func,
};

export default MdxLink;
