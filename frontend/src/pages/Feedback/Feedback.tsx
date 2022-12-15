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
import { ReactComponent as SyncDotLine } from '@assets/sync_dot_line.svg';
import { socket } from '../../service/socket';
import {
	feedbackWrapperStyle,
	feedbackContainerStyle,
	feedbackAreaStyle,
	syncButtonAreaStyle,
	syncDotLineStyle,
} from './Feedback.style';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import useModal from '@hooks/useModal';
import ussCommonSocketEvent from '@hooks/useCommonSocketEvent';
import { meInRoomState, userRoleSelector } from '@store/user.store';
import StreamVideo from '@components/@shared/StreamingVideo/StreamVideo';
import { videoAreaStyle, videoListStyle } from '@styles/commonStyle';
import Loading from '@components/Loading/Loading';

const Feedback = () => {
	usePreventLeave();
	ussCommonSocketEvent();
	const { openModal } = useModal();

	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);
	const feedbackList = useRecoilValue(feedbackListSelector);

	const [videoUrl, setVideoUrl] = useState('');
	const isVideoLoad = videoUrl.length > 0;

	const { interviewerList } = useRecoilValue(userRoleSelector);
	const me = useRecoilValue(meInRoomState);

	const handleEndFeedback = () => {
		openModal('EndFeedbackModal');
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.DOWNLOAD_VIDEO, ({ videoUrl }) => {
			setVideoUrl(videoUrl);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.DOWNLOAD_VIDEO);
		};
	}, []);

	const finishFeedbackBtn = (
		<RoundButton
			style={{
				width: 160,
			}}
			onClick={handleEndFeedback}
		>
			<span>피드백 종료</span>
		</RoundButton>
	);

	return (
		<div css={feedbackWrapperStyle}>
			<div css={feedbackContainerStyle}>
				<div css={videoAreaStyle}>
					{isVideoLoad ? (
						<IntervieweeVideo src={videoUrl} width={'100%'} autoplay muted controls />
					) : (
						<Loading />
					)}
					<div css={videoListStyle}>
						{interviewerList.map((interviewer) => (
							<StreamVideo
								key={interviewer.uuid}
								src={interviewer.stream}
								nickname={interviewer.nickname}
								audio={interviewer.audio}
								width={'33%'}
								isMyStream={interviewer.uuid === me.uuid}
							/>
						))}
					</div>
				</div>
				<div css={syncButtonAreaStyle}>
					<SyncDotLine css={syncDotLineStyle} />
					<RoundButton
						style={{
							width: 48,
							size: 'large',
							color: isFbSync ? 'primary' : 'secondary',
						}}
						onClick={() => setIsFbSync((current) => !current)}
					>
						<LinkIcon />
					</RoundButton>
					<SyncDotLine css={syncDotLineStyle} />
				</div>

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
