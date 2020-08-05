import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { ConsoleApiContext, ConsoleLogContext } from './contexts';

const ConsoleProvider = ({ children }) => {
	const [log, setLog] = useState({});

	const api = useMemo(
		() => ({
			log: (lines) => setLog((previousLog) => ({ ...previousLog, ...lines })),
			replace: (lines) => setLog(lines),
			clear: () => setLog({}),
		}),
		[]
	);

	return (
		<ConsoleApiContext.Provider value={api}>
			<ConsoleLogContext.Provider value={log}>
				{children}
			</ConsoleLogContext.Provider>
		</ConsoleApiContext.Provider>
	);
};
ConsoleProvider.propTypes = { children: PropTypes.node };

export default ConsoleProvider;
