import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { completedFbCntState, othersInRoomState } from '@store/room.store';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';

import { socket } from '../../service/socket';
import BottomBar from '@components/BottomBar/BottomBar';
import { waitingWrapperStyle } from './Waiting.style';
import useCleanupInterview from '@hooks/useCleanupInterview';

const Waiting = () => {
	usePreventLeave();
	const cleanupInterview = useCleanupInterview();
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
			safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		});
	}, []);

	useEffect(() => {
		return cleanupInterview;
	}, []);

	return (
		<>
			<div css={waitingWrapperStyle}>
				<div>면접관이 피드백을 정리 중입니다.</div>
				<div>
					{totalUser.length}명 중 {completedFbCnt}명 완료
				</div>
			</div>
			<BottomBar />
		</>
	);
};

export default Waiting;
