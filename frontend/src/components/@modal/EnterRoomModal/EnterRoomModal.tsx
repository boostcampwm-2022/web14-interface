import React, { useState } from 'react';
import Modal from '@components/@shared/Modal/Modal';
import useModal from '@hooks/useModal';
import { socketEmit } from '@api/socket.api';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { UserType } from '@customType/user';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';
import { useSetRecoilState } from 'recoil';
import { meInRoomState, othersInRoomState, roomUUIDState } from '@store/room.store';

interface attendRoomResponseType {
	success?: boolean;
	error_msg?: string;
	others?: UserType[];
	me?: UserType;
}

const EnterRoomModal = () => {
	const [roomUUID, setRoomUUID] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const setOthers = useSetRecoilState(othersInRoomState);
	const setMe = useSetRecoilState(meInRoomState);
	const setRoom = useSetRecoilState(roomUUIDState);

	const { closeModal } = useModal();
	const { safeNavigate } = useSafeNavigate();

	const handleChange = (e) => {
		setErrorMsg('');
		setRoomUUID(e.target.value);
	};

	const handleAttendRoom = async () => {
		try {
			const { me, others } = await socketEmit<attendRoomResponseType>(
				SOCKET_EVENT_TYPE.ENTER_ROOM,
				roomUUID
			);

			closeModal();
			setOthers(others);
			setMe(me);
			setRoom(roomUUID);
			safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		} catch (e) {
			setErrorMsg(e.message);
		}
	};

	return (
		<Modal>
			<Modal.Title>코드 입력</Modal.Title>
			<Modal.ContentArea>
				<Modal.TextField
					width={'100%'}
					textAlign="center"
					error={errorMsg?.length > 0}
					value={roomUUID}
					onChange={handleChange}
					helperText={errorMsg}
				/>
			</Modal.ContentArea>
			<Modal.ButtonArea>
				<Modal.CloseButton style="contained" color="red">
					닫기
				</Modal.CloseButton>
				<Modal.Button onClick={handleAttendRoom}>참가</Modal.Button>
			</Modal.ButtonArea>
		</Modal>
	);
};

export default EnterRoomModal;
