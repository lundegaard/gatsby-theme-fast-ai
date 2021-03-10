import { useContext, useMemo } from 'react';

import context from './context';

const useStagedFonts = () => {
	const { stage } = useContext(context);

	return useMemo(() => ({ isCriticalStage: stage === 0, stage }), [stage]);
};

export default useStagedFonts;
