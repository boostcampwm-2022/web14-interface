import React, { useState } from 'react';
import Modal from '@components/@shared/Modal/Modal';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { UserType } from '@customType/user';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';
import { useSetRecoilState } from 'recoil';
import { roomUUIDState } from '@store/room.store';
import { meInRoomState, othersInRoomState } from '@store/user.store';

interface attendRoomResponseType {
	success?: boolean;
	error_msg?: string;
	others?: UserType[];
	me?: UserType;
}

const EnterRoomModal = () => {
	const [roomUUID, setRoomUUID] = useState('');
	const isTyping = roomUUID.length <= 0;
	const [inputError, setInputError] = useState(false);
	const setOthers = useSetRecoilState(othersInRoomState);
	const setMe = useSetRecoilState(meInRoomState);
	const setRoom = useSetRecoilState(roomUUIDState);

	const { socketEmit } = useSocket();
	const { closeModal } = useModal();
	const { safeNavigate } = useSafeNavigate();

	const handleChange = (e) => {
		setInputError(false);
		setRoomUUID(e.target.value);
	};

	const handleAttendRoom = async () => {
		try {
			const { me, others } = await socketEmit<attendRoomResponseType>(
				SOCKET_EVENT_TYPE.ENTER_ROOM,
				roomUUID
			);

			setRoom(roomUUID);
			setOthers(others);
			setMe(me);

			closeModal();
			safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		} catch (e) {
			setInputError(true);
		}
	};

	return (
		<Modal>
			<Modal.Title>코드 입력</Modal.Title>
			<Modal.ContentArea>
				<Modal.TextField
					width={'100%'}
					textAlign="center"
					error={inputError}
					value={roomUUID}
					onChange={handleChange}
				/>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.CloseButton>닫기</Modal.CloseButton>
				<Modal.Button onClick={handleAttendRoom} disabled={isTyping}>
					참가
				</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default EnterRoomModal;
