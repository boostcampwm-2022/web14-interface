import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { completedFbCntState, othersInRoomState } from '@store/room.atom';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PHASE_TYPE } from '@constants/phase.constant';

import { socket } from '../../service/socket';

const Waitting = () => {
	const { safeNavigate } = useSafeNavigate();
	const totalUser = useRecoilValue(othersInRoomState);
	const [completedFbCnt, setCompletedFbCnt] = useRecoilState(completedFbCntState);
	useEffect(() => {
		socket.on('count_feedback', (res) => {
			const { count } = res;
			setCompletedFbCnt(count);
		});
		socket.on('terminate_session', () => {
			setCompletedFbCnt(totalUser.length);
			safeNavigate(PHASE_TYPE.LOBBY_PHASE);
		});
	}, []);
	usePreventLeave();
	
	return (
		<>
			<div style={{ padding: '50px' }}>
				{completedFbCnt}/{totalUser.length}
			</div>
		</>
	);
};

export default Waitting;
