import React from 'react';
import useSocket from '@hooks/useSocket';
import Modal from '@components/@shared/Modal/Modal';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';

const EndInterviewModal = () => {
	const { closeModal } = useModal();
	const { socketEmit } = useSocket();

	const hadleEndInterview = () => {
		socketEmit(SOCKET_EVENT_TYPE.END_INTERVIEW);
		closeModal();
	};

	return (
		<Modal>
			<Modal.Title>면접을 종료하시겠습니까?</Modal.Title>
			<Modal.ButtonArea>
				<Modal.CloseButton>취소</Modal.CloseButton>
				<Modal.Button color="red" onClick={hadleEndInterview}>
					종료
				</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default EndInterviewModal;
