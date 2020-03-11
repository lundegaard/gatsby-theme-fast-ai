import { createPortal } from 'react-dom';

import { MODAL_ROOT } from './constants';

const PortalToRoot = ({ children }) =>
	typeof window === 'undefined'
		? null
		: createPortal(children, document.getElementById(MODAL_ROOT));

export default PortalToRoot;
