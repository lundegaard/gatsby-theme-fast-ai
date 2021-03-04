import React, { useMemo } from 'react';

import { Provider } from './context';

// eslint-disable-next-line react/prop-types
const StagedFontsProvider = ({ pluginOptions, children }) => {
	const stage = 0;
	console.log(pluginOptions);

	const api = useMemo(() => ({ stage }), [stage]);

	return <Provider children={children} value={api} />;
};

export default StagedFontsProvider;
