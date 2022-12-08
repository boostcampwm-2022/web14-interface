import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentModalState } from '@store/currentModal.atom';
import EnterRoomModal from './Modal/EnterRoomModal';
import ReactDOM from 'react-dom';

const ModalManager = () => {
	const currentModal = useRecoilValue(currentModalState);

	if (!currentModal) return;

	const modalStore = {
		EnterRoomModal,
	};

	const ModalComponent = modalStore[currentModal.modal];

	return ReactDOM.createPortal(
		<ModalComponent {...currentModal.props} />,
		document.querySelector('#popup-root')
	);
};

export default ModalManager;
