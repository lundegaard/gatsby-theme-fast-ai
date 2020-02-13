import { useContext } from 'react';

import { SuperFieldContext } from './contexts';

export const useSuperFieldContext = () => {
	const context = useContext(SuperFieldContext);

	return context;
};
