import React from 'react';
import PropTypes from 'prop-types';
import { Link as ComponentsLink } from '@fast-ai/ui-components';
import { Link as LinkGatsby, withPrefix } from 'gatsby';
import { complement, o, prop } from 'ramda';
import { startsWithPrefix } from 'ramda-extension';

const defaultIsInternalLink = o(
	complement(startsWithPrefix('http')),
	prop('href')
);

const MdxLink = ({ href, isInternalLink = defaultIsInternalLink, ...rest }) => {
	if (isInternalLink({ href, ...rest })) {
		return (
			<LinkGatsby
				to={href.replace(new RegExp(`^${withPrefix('/')}`), '')}
				{...rest}
			/>
		);
	}

	return <ComponentsLink href={href} {...rest} />;
};

MdxLink.propTypes = {
	href: PropTypes.string,
	isInternalLink: PropTypes.func,
};

export default MdxLink;
