/*  */
import { PATH_TYPE } from '@constants/path.constant';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
	const navigate = useNavigate();
	const { safeNavigate } = useSafeNavigate();
	return (
		<>
			<div>Lobby</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE)}>면접자 시작</button>
			<button onClick={() => navigate(PATH_TYPE.INTERVIEWEE_PATH)}>
				안전하지 않은 면접자 시작
			</button>
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWER_PHASE)}>면접관 시작</button>
		</>
	);
};

export default Lobby;
