import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { socket } from '../../service/socket';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import usePreventLeave from '@hooks/usePreventLeave';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { isFbSyncState } from '@store/feedback.atom';

import { feedbackPageStyle, feedbackPageContainerStyle } from './Feddback.style';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';
import { completedFbCntState } from '@store/room.atom';

const Feedback = () => {
	usePreventLeave();
	const setCompletedFbCnt = useSetRecoilState(completedFbCntState);
	const { safeNavigate } = useSafeNavigate();
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);
	const [videoUrl, setVideoUrl] = useState('');

	const handleEndFeedback = () => {
		socket.emit('end_feedback', (res) => {
			console.log(res);
			const { data } = res;
			const { isLastFeedback, count } = data;
			setCompletedFbCnt(count);
			if (isLastFeedback) safeNavigate(PAGE_TYPE.LOBBY_PAGE);
			else safeNavigate(PAGE_TYPE.WAITTING_PAGE);
		});
	};

	useEffect(() => {
		socket.on('download_video', ({ videoUrl }) => {
			console.log('download');
			console.log(videoUrl);
			setVideoUrl(videoUrl);
		});
	}, []);

	useEffect(() => {
		console.log(videoUrl);
	}, [videoUrl]);

	return (
		<div css={feedbackPageStyle}>
			<div css={feedbackPageContainerStyle}>
				<IntervieweeVideo src={videoUrl} width={400} autoplay muted controls />
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
