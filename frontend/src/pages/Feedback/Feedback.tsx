import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import BottomBar from '@components/BottomBar/BottomBar';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import useCleanupInterview from '@hooks/useCleanupInterview';
import { feedbackDtoSelector, feedbackListSelector, isFbSyncState } from '@store/feedback.store';
import { meInRoomState } from '@store/room.store';
import { completedFbCntState, docsUUIDState } from '@store/interview.store';

import { ReactComponent as LinkIcon } from '@assets/icon/link.svg';
import { socket } from '../../service/socket';
import { feedbackWrapperStyle, feedbackContainerStyle, feedbackAreaStyle } from './Feedback.style';
import { PAGE_TYPE } from '@constants/page.constant';
import theme from '@styles/theme';
import { iconBgStyle } from '@styles/commonStyle';
import { socketEmit } from '@api/socket.api';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { FeedbackDtoType } from '@customType/dto';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import { REST_TYPE } from '@constants/rest.constant';

interface endFeedbackResponseType {
	isLastFeedback: boolean;
	count: number;
}

const Feedback = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();
	const cleanupInterview = useCleanupInterview();

	const setCompletedFbCnt = useSetRecoilState(completedFbCntState);
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);
	const docsUUID = useRecoilValue(docsUUIDState);
	const feedbackListDto = useRecoilValue(feedbackDtoSelector);
	const feedbackList = useRecoilValue(feedbackListSelector);

	const me = useRecoilValue(meInRoomState);
	const [videoUrl, setVideoUrl] = useState('');

	const handleEndFeedback = useCallback(async () => {
		const { isLastFeedback, count } = await socketEmit<endFeedbackResponseType>(
			SOCKET_EVENT_TYPE.END_FEEDBACK
		);
		setCompletedFbCnt(count);
		const feedbackDto: FeedbackDtoType = {
			docsUUID,
			userUUID: me.uuid,
			feedbackList: feedbackListDto,
		};
		axios.post(REST_TYPE.FEEDBACK, feedbackDto);

		if (isLastFeedback) safeNavigate(PAGE_TYPE.LOBBY_PAGE);
		else safeNavigate(PAGE_TYPE.WAITTING_PAGE);
	}, [docsUUID, feedbackListDto, me]);

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
