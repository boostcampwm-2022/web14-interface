import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import Video from '@components/@shared/Video/Video';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { webRTCStreamSelector } from '@store/webRTC.store';
import { docsUUIDState, userRoleSelector } from '@store/room.store';
import { feedbackListSelector } from '@store/feedback.store';

import { socket } from '../../service/socket';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { socketEmit } from '@api/socket.api';
import { interviewerContainerStyle, interviewerWrapperStyle } from './Interviewer.style';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import theme from '@styles/theme';
import BottomBar from '@components/BottomBar/BottomBar';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import { feedbackAreaStyle } from '@pages/Feedback/Feedback.style';

const Interviewer = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const feedbackList = useRecoilValue(feedbackListSelector);
	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const streamList = useRecoilValue(webRTCStreamSelector);
	const setDocsUUID = useSetRecoilState(docsUUIDState);

	const hadleEndInterview = () => {
		socketEmit(SOCKET_EVENT_TYPE.END_INTERVIEW);
	};

	const getStreamFromUUID = (uuid) => {
		return streamList.find((stream) => stream.uuid === uuid).stream;
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.START_FEEDBACK, ({ docsUUID }) => {
			setDocsUUID(docsUUID);
			safeNavigate(PAGE_TYPE.FEEDBACK_PAGE);
		});
	}, []);

	const endInterviewBtn = (
		<RoundButton
			style={{
				backgroundColor: theme.colors.primary,
				width: 200,
				height: 50,
				color: theme.colors.white,
			}}
			onClick={hadleEndInterview}
		>
			<div>면접 종료</div>
		</RoundButton>
	);

	return (
		<div css={interviewerWrapperStyle}>
			<div css={interviewerContainerStyle}>
				<div>
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
				</div>
				<div css={feedbackAreaStyle}>
					<FeedbackList feedbackList={feedbackList} editable />
					<FeedbackForm />
				</div>
			</div>
			<BottomBar mainController={endInterviewBtn} />
		</div>
	);
};

export default Interviewer;
