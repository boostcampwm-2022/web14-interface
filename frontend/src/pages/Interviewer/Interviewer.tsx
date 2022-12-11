import React, { useEffect } from 'react';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import FeedbackList from '@components/FeedbackList/FeedbackList';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { docsUUIDState } from '@store/interview.store';
import { feedbackListSelector } from '@store/feedback.store';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { socket } from '@service/socket';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import BottomBar from '@components/BottomBar/BottomBar';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import { feedbackAreaStyle } from '@pages/Feedback/Feedback.style';
import StreamVideo from '@components/@shared/StreamingVideo/StreamVideo';
import useModal from '@hooks/useModal';
import { userRoleSelector } from '@store/user.store';

import { interviewerContainerStyle, interviewerWrapperStyle } from './Interviewer.style';
import useLeaveUser from '@hooks/useLeaveUser';

const Interviewer = () => {
	const { openModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();
	useLeaveUser();

	const feedbackList = useRecoilValue(feedbackListSelector);
	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const setDocsUUID = useSetRecoilState(docsUUIDState);

	const hadleEndInterview = () => {
		openModal('EndInterviewModal');
	};

	const hadleCancelInterview = () => {
		openModal('CancelInterviewModal');
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.START_FEEDBACK, ({ docsUUID }) => {
			setDocsUUID(docsUUID);
			safeNavigate(PAGE_TYPE.FEEDBACK_PAGE);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.START_FEEDBACK);
		};
	}, []);

	const endInterviewBtn = (
		<>
			<RoundButton
				style={{
					width: 160,
					height: 50,
				}}
				onClick={hadleEndInterview}
			>
				<span>면접 종료</span>
			</RoundButton>
			<RoundButton
				style={{
					width: 50,
					height: 50,
				}}
				onClick={hadleCancelInterview}
			>
				<span>X</span>
			</RoundButton>
		</>
	);

	return (
		<div css={interviewerWrapperStyle}>
			<div css={interviewerContainerStyle}>
				<div>
					<IntervieweeVideo
						key={interviewee.uuid}
						src={interviewee.stream}
						nickname={interviewee.uuid}
						width={'400px'}
						autoplay
						muted
					/>
					{interviewerList.map((interviewer) => (
						<StreamVideo
							key={interviewer.uuid}
							src={interviewer.stream}
							nickname={interviewer.uuid}
							width={'200px'}
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
