import React from 'react';
import { FormattedMessage } from 'gatsby-theme-fast-ai';

import m from '../intl/messages';

export const links = [
	{ label: <FormattedMessage {...m.pageHome} />, to: '/' },
	{ label: <FormattedMessage {...m.pageTerms} />, to: '/terms-and-conditions' },
	{ label: <FormattedMessage {...m.pageTryIt} />, to: '/try-it' },
];
