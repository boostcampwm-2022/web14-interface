import React from 'react';
import useSocket from '@hooks/useSocket';
import Modal from '@components/@shared/Modal/Modal';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useModal from '@hooks/useModal';
import useSafeNavigate from '@hooks/useSafeNavigate';
import useCleanupRoom from '@hooks/useCleanupRoom';
import useWebRTCSignaling from '@hooks/useWebRTCSignaling';
import { useRecoilState, useRecoilValue } from 'recoil';
import { meInRoomState, webRTCUserMapState } from '@store/user.store';
import { socket } from '@service/socket';

export interface ExitRoomModalPropType {
	content?: string;
}

const ExitRoomModal = ({ content }: ExitRoomModalPropType) => {
	const { closeModal } = useModal();
	const cleanupRoom = useCleanupRoom();
	const { safeNavigate } = useSafeNavigate();
	const { socketEmit } = useSocket();

	const me = useRecoilValue(meInRoomState);
	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserMapState);
	const { closeConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);

	const handleLeaveRoom = async () => {
		await socketEmit(SOCKET_EVENT_TYPE.LEAVE_ROOM);
		closeConnection(me);
		socket.removeAllListeners();
		cleanupRoom();

		closeModal();
		safeNavigate(PAGE_TYPE.LANDING_PAGE);
	};

	return (
		<Modal>
			<Modal.Title>방을 나가시겠습니까?</Modal.Title>
			{content && (
				<Modal.ContentArea>
					<div>{content}</div>
				</Modal.ContentArea>
			)}
			<Modal.ButtonArea>
				<Modal.CloseButton>취소</Modal.CloseButton>

				<Modal.Button color="red" onClick={handleLeaveRoom}>
					나가기
				</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default ExitRoomModal;
