import React, { useEffect } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('/socket');
const Landing = () => {
	usePreventLeave();

	useEffect(() => {
		socket.emit('create_room');
	}, []);

	const { safeNavigate } = useSafeNavigate();
	const handleSignOut = async () => {
		const res = await axios.get('/api/auth/logout');
		console.log(res.data.statusCode);
	};
	return (
		<>
			<div>Landing</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.LOBBY_PHASE)}>방참가/생성</button>
			<button onClick={handleSignOut}>로그아웃</button>
		</>
	);
};

export default Landing;
