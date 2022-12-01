import React from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import axios from 'axios';

const Landing = () => {
	usePreventLeave();
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
