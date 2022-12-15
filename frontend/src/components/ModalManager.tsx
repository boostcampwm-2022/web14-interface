import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentModalState } from '@store/currentModal.store';
import ReactDOM from 'react-dom';
import EnterRoomModal from './@modal/EnterRoomModal';
import RoomInfoModal from './@modal/RoomInfoModal';
import StartInterviewModal from './@modal/StartInterviewModal';
import ExitRoomModal from './@modal/ExitRoomModal';
import CancelInterviewModal from './@modal/CancelInterviewModal';
import EndInterviewModal from './@modal/EndInterviewModal';
import EndFeedbackModal from './@modal/EndFeedbackModal';
import InterviewDocsModal from './@modal/InterviewDocsModal/InterviewDocsModal';
import TimeOverAlertModal from './@modal/TimeOverAlertModal';

export type MODAL_TYPE = keyof typeof modalStore;

//TODO 다이나믹 import로 변경
const modalStore = {
	EnterRoomModal,
	InterviewDocsModal,
	RoomInfoModal,
	StartInterviewModal,
	ExitRoomModal,
	EndInterviewModal,
	CancelInterviewModal,
	EndFeedbackModal,
	TimeOverAlertModal,
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
