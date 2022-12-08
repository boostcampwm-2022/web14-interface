import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import Video from '@components/@shared/Video/Video';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { webRTCStreamSelector } from '@store/webRTC.store';
import { userRoleSelector } from '@store/room.store';

import { socket } from '../../service/socket';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { css } from '@emotion/react';
import { socketEmit } from '@api/socket.api';

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const streamList = useRecoilValue(webRTCStreamSelector);

	const hadleEndInterview = () => {
		socketEmit(SOCKET_EVENT_TYPE.END_INTERVIEW);
	};

	const getStreamFromUUID = (uuid) => {
		return streamList.find((stream) => stream.uuid === uuid).stream;
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.START_FEEDBACK, () => {
			safeNavigate(PAGE_TYPE.FEEDBACK_PAGE);
		});
	}, []);

	return (
		<div css={InterviewerWrapperStyle}>
			<div>Interviewer</div>
			<div>면접자 : {interviewee.uuid}</div>
			<IntervieweeVideo
				key={interviewee.uuid}
				src={getStreamFromUUID(interviewee.uuid)}
				width={400}
				autoplay
				muted
			/>
			{interviewerList.map((interviewer) => (
				<Video
					key={interviewer.uuid}
					src={getStreamFromUUID(interviewer.uuid)}
					width={200}
					autoplay
					muted
				/>
			))}

			<FeedbackList editable />
			<button onClick={hadleEndInterview}>면접 종료</button>
		</div>
	);
};

export default Interviewer;

const InterviewerWrapperStyle = (theme) => css`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
	background-color: ${theme.colors.primary3};
`;
