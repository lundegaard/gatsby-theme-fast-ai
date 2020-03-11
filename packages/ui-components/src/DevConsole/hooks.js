import { useContext } from 'react';

import { DevConsoleApiContext, DevConsoleLogContext } from './contexts';

export const useDevConsole = () => useContext(DevConsoleApiContext);
export const useDevConsoleLog = () => useContext(DevConsoleLogContext);
