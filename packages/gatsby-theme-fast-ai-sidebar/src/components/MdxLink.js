import React from 'react';
import PropTypes from 'prop-types';
import { Link as ComponentsLink } from '@fast-ai/ui-components';
import { Link as LinkGatsby } from '@reach/router';
import { complement, o, prop } from 'ramda';
import { startsWithPrefix } from 'ramda-extension';

const defaultIsInternalLink = o(
	complement(startsWithPrefix('http')),
	prop('href')
);

const MdxLink = ({ href, isInternalLink = defaultIsInternalLink, ...rest }) => {
	const linkProps = isInternalLink({ href, ...rest })
		? { as: LinkGatsby, to: href }
		: { href };

	return <ComponentsLink {...linkProps} {...rest} />;
};

MdxLink.propTypes = {
	href: PropTypes.string,
	isInternalLink: PropTypes.func,
};

export default MdxLink;
