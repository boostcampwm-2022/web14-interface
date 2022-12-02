import React, { useEffect, useState } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import axios from 'axios';
import { socket } from '../../service/socket';
import { meInRoomState, othersInRoomState, roomUUIDState } from '@store/room.atom';
import { useSetRecoilState } from 'recoil';

const Landing = () => {
	usePreventLeave();
	const [roomNumber, setRoomNumber] = useState('');
	const setRoom = useSetRecoilState(roomUUIDState);
	const setOthers = useSetRecoilState(othersInRoomState);
	const setMe = useSetRecoilState(meInRoomState);

	const { safeNavigate } = useSafeNavigate();
	const handleSignOut = async () => {
		const res = await axios.get('/api/auth/logout');
		console.log(res.data.statusCode);
	};

	const handleAttendRoom = () => {
		attendRoom(roomNumber);
	};

	const handleCreate = () => {
		//TODO: magic ev type
		socket.emit('create_room', (res) => {
			console.log(res);
			const { uuid } = res.data;
			setRoom(uuid);
			attendRoom(uuid);
		});
	};

	const attendRoom = (roomUUID) => {
		socket.emit('enter_room', roomUUID, (res) => {
			console.log(res);
			const { data, success, message } = res;
			if (!success) {
				alert(message);
				return;
			}
			const { others, me } = data;
			setOthers(others);
			setMe(me);
			safeNavigate(PHASE_TYPE.LOBBY_PHASE);
		});
	};

	return (
		<>
			<div>Landing</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.LOBBY_PHASE)}>방참가/생성</button>
			<input
				type="text"
				placeholder="방번호를 입력하세요"
				value={roomNumber}
				onChange={(e) => setRoomNumber(e.target.value)}
			/>
			<button onClick={handleCreate}>방생성</button>

			<button onClick={handleAttendRoom}>방참가</button>
			<button onClick={handleSignOut}>로그아웃</button>
		</>
	);
};

export default Landing;
