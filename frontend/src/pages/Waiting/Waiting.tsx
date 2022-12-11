import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { completedFbCntState } from '@store/interview.store';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';

import { socket } from '../../service/socket';
import BottomBar from '@components/BottomBar/BottomBar';
import { waitingWrapperStyle } from './Waiting.style';
import useCleanupInterview from '@hooks/useCleanupInterview';
import { othersInRoomState } from '@store/user.store';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';

const Waiting = () => {
	usePreventLeave();
	const cleanupInterview = useCleanupInterview();
	const { safeNavigate } = useSafeNavigate();
	const totalUser = useRecoilValue(othersInRoomState);
	const [completedFbCnt, setCompletedFbCnt] = useRecoilState(completedFbCntState);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.COUNT_FEEDBACK, (res) => {
			const { count } = res;
			setCompletedFbCnt(count);
		});

		socket.on(SOCKET_EVENT_TYPE.TERMINATE_SESSION, () => {
			setCompletedFbCnt(totalUser.length);
			safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.COUNT_FEEDBACK);
			socket.off(SOCKET_EVENT_TYPE.TERMINATE_SESSION);
		};
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
