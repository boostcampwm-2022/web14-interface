/*  */
import React from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';

const Interviewee = () => {
	const { safeNavigate } = useSafeNavigate();
	return (
		<>
			<div>Interviewee</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.WAITTING_PHASE)}>면접 종료</button>
		</>
	);
};

export default Interviewee;
