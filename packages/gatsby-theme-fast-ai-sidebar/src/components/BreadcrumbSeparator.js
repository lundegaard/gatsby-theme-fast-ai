import React from 'react';
import { IconArrowForward } from '@fast-ai/ui-components';

// NOTE: To  make it replaceble by gatsby theming mechanism we have separate
// component for it.
//
const BreadcrumbSeparator = props => <IconArrowForward {...props} />;

export default BreadcrumbSeparator;
