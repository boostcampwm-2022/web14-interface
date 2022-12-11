import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentModalState } from '@store/currentModal.store';
import ReactDOM from 'react-dom';
import EnterRoomModal from './@modal/EnterRoomModal/EnterRoomModal';
import InterviewDocsListModal from './@modal/InterviewDocsListModal/InterviewDocsListModal';
import InterviewDocsItemModal from './@modal/InterviewDocsModal/InterviewDocsModal';
import CopyTextFieldModal from './@modal/CopyTextFieldModal/CopyTextFieldModal';
import StartInterviewModal from './@modal/StartInterviewModal/StartInterviewModal';
import ExitRoomModal from './@modal/ExitRoomModal/StartInterviewModal/ExitRoomModal';
import CancelInterviewModal from './@modal/CancelInterviewModal/CancelInterviewModal';
import EndInterviewModal from './@modal/EndInterviewModal/EndInterviewModal';
import EndFeedbackModal from './@modal/EndFeedbackModal/EndFeedbackModal';

export type MODAL_TYPE = keyof typeof modalStore;

//TODO 다이나믹 import로 변경
const modalStore = {
	EnterRoomModal,
	InterviewDocsListModal,
	InterviewDocsItemModal,
	CopyTextFieldModal,
	StartInterviewModal,
	ExitRoomModal,
	EndInterviewModal,
	CancelInterviewModal,
	EndFeedbackModal,
};

const ModalManager = () => {
	const currentModal = useRecoilValue(currentModalState);

	if (!currentModal) return;

	const ModalComponent = modalStore[currentModal.modal];

	return ReactDOM.createPortal(
		<ModalComponent {...currentModal.props} />,
		document.querySelector('#popup-root')
	);
};

export default ModalManager;
