import React, { useEffect, useRef } from 'react';
import { PAGE_TYPE } from '@constants/page.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { useRecoilValue } from 'recoil';
import { webRTCStreamSelector } from '@store/webRTC.atom';
import Video from '@components/@shared/Video/Video';
import { socket } from '../../service/socket';
import { userRoleSelector } from '@store/room.atom';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { css } from '@emotion/react';

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const currentVideoTime = useRecoilValue(currentVideoTimeState);

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const streamList = useRecoilValue(webRTCStreamSelector);

	const hadleEndInterview = () => {
		socket.emit('end_interview', (res) => {
			console.log(res);
		});
	};

	const getStreamFromUUID = (uuid) => {
		return streamList.find((stream) => stream.uuid === uuid).stream;
	};

	useEffect(() => {
		console.log(currentVideoTime);
	}, [currentVideoTime]);

	useEffect(() => {
		console.log(interviewee);
		socket.on('start_feedback', () => {
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

			<FeedbackArea />
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
