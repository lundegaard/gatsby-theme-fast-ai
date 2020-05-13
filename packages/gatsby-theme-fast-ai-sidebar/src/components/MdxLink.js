/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link as ComponentsLink } from '@fast-ai/ui-components';
import { Link as LinkGatsby } from '@reach/router';
import { startsWithPrefix } from 'ramda-extension';

const isAbsoluteUrl = startsWithPrefix('http');

/* eslint-disable react/prop-types */
const MdxLink = ({ href, ...rest }) => {
	const isInternalLink = !isAbsoluteUrl(href);

	const linkProps = isInternalLink ? { as: LinkGatsby, to: href } : { href };

	return <ComponentsLink {...linkProps} {...rest} />;
};
export default MdxLink;
