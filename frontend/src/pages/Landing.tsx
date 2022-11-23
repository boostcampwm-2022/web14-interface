/*  */
import React from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';

const Landing = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();
	return (
		<>
			<div>Landing</div>
			<button onClick={() => safeNavigate(PHASE_TYPE.LOBBY_PHASE)}>방참가/생성</button>
		</>
	);
};

export default Landing;
