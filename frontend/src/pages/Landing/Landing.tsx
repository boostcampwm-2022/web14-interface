import React, { useState } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import axios from 'axios';
import { meInRoomState, othersInRoomState, roomUUIDState } from '@store/room.atom';
import { useSetRecoilState } from 'recoil';
import { SOCKET_EVENT_TYPE } from '@constants/event.constant';
import { socketEmit } from '../../api/socket.api';
import { UserDTO } from '@customType/user';

interface createRoomResponseType {
	uuid: string;
}

interface attendRoomResponseType {
	others: UserDTO[];
	me: UserDTO;
}

const Landing = () => {
	usePreventLeave();
	const [roomNumber, setRoomNumber] = useState('');
	const setRoom = useSetRecoilState(roomUUIDState);
	const setOthers = useSetRecoilState(othersInRoomState);
	const setMe = useSetRecoilState(meInRoomState);

	const { safeNavigate } = useSafeNavigate();

	const handleSignOut = async () => {
		const res = await axios.get('/api/auth/logout');
		alert(res.data.statusCode);
	};

	const handleAttendRoom = () => {
		attendRoom(roomNumber);
	};

	const handleCreate = async () => {
		const { uuid } = await socketEmit<createRoomResponseType>(SOCKET_EVENT_TYPE.CRERATE_ROOM);
		setRoom(uuid);
		attendRoom(uuid);
	};

	const attendRoom = async (roomUUID) => {
		const { others, me } = await socketEmit<attendRoomResponseType>(
			SOCKET_EVENT_TYPE.COUNT_FEEDBACK,
			roomUUID
		);

		setOthers(others);
		setMe(me);
		safeNavigate(PHASE_TYPE.LOBBY_PHASE);
	};

	return (
		<>
			<div>Landing</div>
			<input
				type="text"
				placeholder="방번호를 입력하세요"
				value={roomNumber}
				onChange={(e) => setRoomNumber(e.target.value)}
			/>
			<button onClick={handleCreate}>방생성</button>

			<button onClick={handleAttendRoom}>방참가</button>
			<button onClick={handleSignOut}>로그아웃</button>
			<button onClick={handleSignOut}>내 기록</button>
			<button onClick={handleSignOut}>로그아웃</button>
		</>
	);
};

export default Landing;
