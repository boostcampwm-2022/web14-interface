import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { socket } from '../../service/socket';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import usePreventLeave from '@hooks/usePreventLeave';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { isFbSyncState } from '@store/feedback.atom';

import { feedbackPageStyle, feedbackPageContainerStyle } from './Feddback.style';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PHASE_TYPE } from '@constants/phase.constant';
import { completedFbCntState } from '@store/room.atom';

const Feedback = () => {
	usePreventLeave();
	const setCompletedFbCnt = useSetRecoilState(completedFbCntState);
	const { safeNavigate } = useSafeNavigate();
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);

	const handleEndFeedback = () => {
		socket.emit('end_feedback', (res) => {
			console.log(res);
			const { data } = res;
			const { isLastFeedback, count } = data;
			setCompletedFbCnt(count);
			if (isLastFeedback) safeNavigate(PHASE_TYPE.LOBBY_PHASE);
			else safeNavigate(PHASE_TYPE.WAITTING_PHASE);
		});
	};

	return (
		<div css={feedbackPageStyle}>
			<div css={feedbackPageContainerStyle}>
				<IntervieweeVideo src="/assets/test.mp4" width={400} autoplay muted controls />
				<button
					type="button"
					onClick={() => setIsFbSync((current) => !current)}
					style={{ color: 'white', height: '40px', width: '65px' }}
				>
					{isFbSync ? 'Sync' : 'UnSync'}
				</button>
				<FeedbackArea />
				<button onClick={handleEndFeedback}>피드백 종료</button>
			</div>
		</div>
	);
};

export default Feedback;
