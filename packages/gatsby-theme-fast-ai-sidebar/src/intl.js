import React, { createContext, useContext } from 'react';
import { IntlContextConsumer } from 'gatsby-plugin-intl';

export const IntlProxyContext = createContext();
export const IntlProxyContextProvider = props => (
	<IntlContextConsumer>
		{value => <IntlProxyContext.Provider value={value} {...props} />}
	</IntlContextConsumer>
);

export const IntlProxyContextConsumer = IntlProxyContext.Consumer;

export const useIntlContext = () => useContext(IntlProxyContext);
