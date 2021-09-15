import React from 'react';
import { Link as GatsbyLink } from 'gatsby-plugin-intl';
import { Link as ComponentsLink } from '@fast-ai/ui-components';

const Link = props => <ComponentsLink as={GatsbyLink} {...props} />;

export default Link;
