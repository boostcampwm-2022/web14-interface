import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import BottomBar from '@components/BottomBar/BottomBar';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { isFbSyncState } from '@store/feedback.atom';
import { completedFbCntState } from '@store/room.atom';

import { ReactComponent as LinkIcon } from '@assets/icon/link.svg';
import { socket } from '../../service/socket';
import { feedbackWrapperStyle, feedbackPageContainerStyle } from './Feedback.style';
import { PAGE_TYPE } from '@constants/page.constant';
import theme from '@styles/theme';
import { iconBgStyle } from '@styles/commonStyle';

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

	const finishFeedbackBtn = (
		<RoundButton
			style={{
				backgroundColor: theme.colors.primary,
				width: 200,
				height: 50,
				color: theme.colors.white,
			}}
			onClick={handleEndFeedback}
		>
			<div>피드백 종료</div>
		</RoundButton>
	);

	return (
		<div css={feedbackWrapperStyle}>
			<div css={feedbackPageContainerStyle}>
				<IntervieweeVideo src={videoUrl} width={400} autoplay muted controls />
				<button
					style={{
						backgroundColor: isFbSync ? theme.colors.primary : theme.colors.white,
						width: 50,
						height: 50,
						borderRadius: '25px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onClick={() => setIsFbSync((current) => !current)}
				>
					<LinkIcon
						{...iconBgStyle}
						fill={isFbSync ? theme.colors.white : theme.colors.primary}
					/>
				</button>
				<FeedbackArea />
			</div>
			<BottomBar mainController={finishFeedbackBtn} />
		</div>
	);
};

export default Feedback;
