import React from 'react';

import useSocket from '@hooks/useSocket';
import Modal from '@components/@shared/Modal/Modal';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';

const TimeOverAlertModal = () => {
	const { closeModal } = useModal();
	const { socketEmit } = useSocket();

	const hadleEndInterview = () => {
		socketEmit(SOCKET_EVENT_TYPE.END_INTERVIEW);
		closeModal();
	};

	return (
		<Modal>
			<Modal.Title color="red">녹화 제한 시간 초과</Modal.Title>
			<Modal.ContentArea gap={'0px'}>
				<span>현재 시점부터는 영상이 녹화되지 않습니다.</span>
				<span>면접을 종료해주십시오.</span>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.Button onClick={hadleEndInterview}>면접 종료</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default TimeOverAlertModal;
