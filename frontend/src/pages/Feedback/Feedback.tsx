import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import usePreventLeave from '@hooks/usePreventLeave';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { feedbackSelector, isFbSyncState } from '@store/feedback.atom';
import { completedFbCntState, docsUUIDState, meInRoomState } from '@store/room.atom';

import { socket } from '../../service/socket';
import { socketEmit } from '@api/socket.api';
import { PAGE_TYPE } from '@constants/page.constant';
import { REST_TYPE } from '@constants/rest.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { FeedbackDtoType } from '@customType/dto';
import { feedbackPageStyle, feedbackPageContainerStyle } from './Feddback.style';

const Feedback = () => {
	usePreventLeave();
	const setCompletedFbCnt = useSetRecoilState(completedFbCntState);
	const { safeNavigate } = useSafeNavigate();
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);
	const [videoUrl, setVideoUrl] = useState('');
	const docsUUID = useRecoilValue(docsUUIDState);
	const feedbackList = useRecoilValue(feedbackSelector);
	const me = useRecoilValue(meInRoomState);

	const handleEndFeedback = useCallback(() => {
		socketEmit(SOCKET_EVENT_TYPE.END_FEEDBACK, ({ data }) => {
			const { isLastFeedback, count } = data;
			setCompletedFbCnt(count);
			const feedbackDTO: FeedbackDtoType = {
				docsUUID,
				userUUID: me.uuid,
				feedbackList,
			};
			axios.post(REST_TYPE.FEEDBACK, feedbackDTO);

			if (!isLastFeedback) safeNavigate(PAGE_TYPE.LOBBY_PAGE);
			else safeNavigate(PAGE_TYPE.WAITTING_PAGE);
		});
	}, [docsUUID, feedbackList]);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.DOWNLOAD_VIDEO, ({ videoUrl }) => {
			setVideoUrl(videoUrl);
		});
	}, []);

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
