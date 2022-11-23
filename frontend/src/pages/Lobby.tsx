import React from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';

const Lobby = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();
	return (
		<>
			<div>Lobby</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE)}>면접자 시작</button>
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWER_PHASE)}>면접관 시작</button>
		</>
	);
};

export default Lobby;
