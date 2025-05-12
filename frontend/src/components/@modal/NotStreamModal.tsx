import React from 'react';
import Modal from '@components/@shared/Modal/Modal';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useCleanupRoom from '@hooks/useCleanupRoom';
import useModal from '@hooks/useModal';
import useSafeNavigate from '@hooks/useSafeNavigate';
import useSocket from '@hooks/useSocket';
import { socket } from '@service/socket';

const NotStreamModal = () => {
	const { closeModal } = useModal();
	const cleanupRoom = useCleanupRoom();
	const { safeNavigate } = useSafeNavigate();
	const { socketEmit } = useSocket();

	const handleLeaveRoom = async () => {
		await socketEmit(SOCKET_EVENT_TYPE.LEAVE_ROOM);
		socket.removeAllListeners();
		cleanupRoom();

		closeModal();
		safeNavigate(PAGE_TYPE.LANDING_PAGE);
	};

	return (
		<Modal>
			<Modal.Title color="red">미디어 오류</Modal.Title>
			<Modal.ContentArea gap="0px">
				<span>미디어를 가져올 수 없습니다.</span>
				<span>화상 회의, 화면 공유 등이 진행 중인 경우,</span>
				<span>연결이 어려울 수 있습니다.</span>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.Button color="red" onClick={handleLeaveRoom}>
					방 나가기
				</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default NotStreamModal;
