import React from 'react';
import { Link as IntlLink } from 'gatsby-plugin-intl';
import { Link as GatsbyLink } from '@reach/router';
import { Link as ComponentsLink } from '@fast-ai/ui-components';

const Link = (props) => <ComponentsLink as={IntlLink} {...props} />;

export const NoIntlLink = (props) => <ComponentsLink as={GatsbyLink} {...props} />;

export default Link;
