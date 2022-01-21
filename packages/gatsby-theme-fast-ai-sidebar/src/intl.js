import { useContext } from 'react';
import { IntlContextConsumer } from 'gatsby-plugin-intl';

export const useIntlContext = () => useContext(IntlContextConsumer._context);
