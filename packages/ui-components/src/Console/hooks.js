import { useContext } from 'react';

import { ConsoleApiContext, ConsoleLogContext } from './contexts';

export const useConsole = () => useContext(ConsoleApiContext);
export const useConsoleLog = () => useContext(ConsoleLogContext);
