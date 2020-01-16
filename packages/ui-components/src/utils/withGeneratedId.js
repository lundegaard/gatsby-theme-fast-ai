import React, { forwardRef } from 'react';

import getDisplayName from '../utils/getDisplayName';
import useGeneratedId from '../hooks/useGeneratedId';

const withGeneratedId = NextComponent => {
	const WithGeneratedId = forwardRef((props, ref) => {
		const generatedId = useGeneratedId();

		return <NextComponent generatedId={generatedId} ref={ref} {...props} />;
	});

	WithGeneratedId.displayName = `withGeneratedId(${getDisplayName(NextComponent)})`;

	return WithGeneratedId;
};

export default withGeneratedId;
