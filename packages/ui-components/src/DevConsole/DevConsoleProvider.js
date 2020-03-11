import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { DevConsoleApiContext, DevConsoleLogContext } from './contexts';

const DevConsoleProvider = ({ children }) => {
	const [log, setLog] = useState([]);

	const api = useMemo(
		() => ({
			log: line => setLog(prevLog => [...prevLog, line]),
			clear: () => setLog(() => []),
		}),
		[]
	);

	return (
		<DevConsoleApiContext.Provider value={api}>
			<DevConsoleLogContext.Provider value={log}>{children}</DevConsoleLogContext.Provider>
		</DevConsoleApiContext.Provider>
	);
};
DevConsoleProvider.propTypes = { children: PropTypes.node };

export default DevConsoleProvider;
