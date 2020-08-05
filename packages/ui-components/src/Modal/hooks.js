import { useContext, useMemo } from 'react';

import { ModalApiContext } from './contexts';

export const useModal = ({ component }) => {
	const modalApi = useContext(ModalApiContext);

	const api = useMemo(
		() => ({
			openModal: (modalProps) => {
				modalApi.openModal(component, modalProps);
			},
			closeModal: () => {
				modalApi.closeModal(component);
			},
		}),
		[component, modalApi]
	);

	return api;
};
