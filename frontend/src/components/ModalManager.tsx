import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentModalState } from '@store/currentModal.store';
import ReactDOM from 'react-dom';
import EnterRoomModal from './Modal/EnterRoomModal';
import InterviewDocsModal from './Modal/InterviewDocsModal';

const ModalManager = () => {
	const currentModal = useRecoilValue(currentModalState);

	if (!currentModal) return;

	//TODO 다이나믹 import로 변경
	const modalStore = {
		EnterRoomModal,
		InterviewDocsModal,
	};

	const ModalComponent = modalStore[currentModal.modal];

	return ReactDOM.createPortal(
		<ModalComponent {...currentModal.props} />,
		document.querySelector('#popup-root')
	);
};

export default ModalManager;
