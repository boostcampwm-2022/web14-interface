import React from 'react';

import { socketEmit } from '@api/socket.api';
import Modal from '@components/@shared/Modal/Modal';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';

const TimeOverAlertModal = () => {
	const { closeModal } = useModal();

	const hadleEndInterview = () => {
		socketEmit(SOCKET_EVENT_TYPE.END_INTERVIEW);
		closeModal();
	};

	return (
		<Modal>
			<Modal.Title color="red">1시간이 경과하였습니다.</Modal.Title>
			<Modal.ContentArea>
				<span>현재 시점부터는 영상이 녹화되지 않습니다.</span>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.Button onClick={hadleEndInterview}>면접 종료</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default TimeOverAlertModal;
