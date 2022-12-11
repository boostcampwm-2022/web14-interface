import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import BottomBar from '@components/BottomBar/BottomBar';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import usePreventLeave from '@hooks/usePreventLeave';
import useCleanupInterview from '@hooks/useCleanupInterview';
import { feedbackListSelector, isFbSyncState } from '@store/feedback.store';

import { ReactComponent as LinkIcon } from '@assets/icon/link.svg';
import { socket } from '../../service/socket';
import { feedbackWrapperStyle, feedbackContainerStyle, feedbackAreaStyle } from './Feedback.style';
import theme from '@styles/theme';
import { iconBgStyle } from '@styles/commonStyle';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import useModal from '@hooks/useModal';

interface endFeedbackResponseType {
	isLastFeedback: boolean;
	count: number;
}

const Feedback = () => {
	usePreventLeave();
	const { openModal } = useModal();
	const cleanupInterview = useCleanupInterview();

	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);
	const feedbackList = useRecoilValue(feedbackListSelector);

	const [videoUrl, setVideoUrl] = useState('');

	const handleEndFeedback = () => {
		openModal('EndFeedbackModal');
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.DOWNLOAD_VIDEO, ({ videoUrl }) => {
			setVideoUrl(videoUrl);
		});
	}, []);

	useEffect(() => {
		return cleanupInterview;
	}, []);

	const finishFeedbackBtn = (
		<RoundButton
			style={{
				width: 160,
				height: 50,
			}}
			onClick={handleEndFeedback}
		>
			<span>피드백 종료</span>
		</RoundButton>
	);

	return (
		<div css={feedbackWrapperStyle}>
			<div css={feedbackContainerStyle}>
				<IntervieweeVideo src={videoUrl} width={'400px'} autoplay muted controls />
				<RoundButton
					style={{
						width: 50,
						height: 50,
						backgroundColor: isFbSync ? theme.colors.primary : theme.colors.white,
					}}
					onClick={() => setIsFbSync((current) => !current)}
				>
					<LinkIcon
						{...iconBgStyle}
						fill={isFbSync ? theme.colors.white : theme.colors.primary}
					/>
				</RoundButton>
				<div css={feedbackAreaStyle}>
					<FeedbackList feedbackList={feedbackList} editable />
					<FeedbackForm />
				</div>
			</div>
			<BottomBar mainController={finishFeedbackBtn} />
		</div>
	);
};

export default Feedback;
