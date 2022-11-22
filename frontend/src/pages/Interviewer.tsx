import React from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();
	return (
		<>
			<div>Interviewer</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.FEEDBACK_PHASE)}>면접 종료</button>
		</>
	);
};

export default Interviewer;
