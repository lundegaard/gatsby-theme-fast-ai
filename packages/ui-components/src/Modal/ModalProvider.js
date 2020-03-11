import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { valueMirror } from 'ramda-extension';

import Flex from '../Flex';

import PortalToRoot from './PortalToRoot';
import Backdrop from './Backdrop';
import { ModalApiContext } from './contexts';

const initialState = { modalProps: null, component: null, isOpened: false };
const ActionTypes = valueMirror(['OPEN_MODAL', 'CLOSE_MODAL']);

const reducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.OPEN_MODAL: {
			const { component, modalProps } = action.payload;
			return {
				component,
				modalProps,
				isOpened: true,
			};
		}
		case ActionTypes.CLOSE_MODAL: {
			return {
				component: null,
				modalProps: null,
				isOpened: false,
			};
		}
	}
	return state;
};

const actions = {
	openModal: payload => ({ type: ActionTypes.OPEN_MODAL, payload }),
	closeModal: payload => ({ type: ActionTypes.CLOSE_MODAL, payload }),
};

const toggleBodyClassname = (className, toggler) => {
	if (typeof window === 'undefined') {
		return;
	}
	const classList = document.body.classList;
	return toggler ? classList.add(className) : classList.remove(className);
};

export const ModalProvider = ({ children, bodyModalClassname = 'modal' }) => {
	const [{ isOpened, modalProps, component: ModalComponent }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const api = useMemo(
		() => ({
			openModal: (component, modalProps) => {
				dispatch(actions.openModal({ component, modalProps }));

				toggleBodyClassname(`${bodyModalClassname}--opened`, true);
			},
			closeModal: component => {
				dispatch(actions.closeModal({ component }));

				toggleBodyClassname(`${bodyModalClassname}--opened`, false);
			},
		}),
		[bodyModalClassname]
	);

	return (
		<ModalApiContext.Provider value={api}>
			{children}
			{isOpened && ModalComponent && (
				<PortalToRoot>
					<Backdrop onClick={() => api.closeModal(ModalComponent)} />
					<Flex
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						sx={{
							zIndex: 1001,
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							p: [0, 4],
						}}
					>
						<ModalComponent {...modalProps} {...api} />
					</Flex>
				</PortalToRoot>
			)}
		</ModalApiContext.Provider>
	);
};

ModalProvider.propTypes = {
	bodyModalClassname: PropTypes.string,
	children: PropTypes.node,
};

export default ModalProvider;
