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
import { meInRoomState, userRoleSelector } from '@store/user.store';

import { interviewerContainerStyle, interviewerWrapperStyle } from './Interviewer.style';
import useLeaveUser from '@hooks/useLeaveUser';
import { flexColumn, flexRow } from '@styles/globalStyle';
import { ReactComponent as StopIcon } from '@assets/icon/stop.svg';
import { ReactComponent as CancelIcon } from '@assets/icon/close.svg';
import { css } from '@emotion/react';

const Interviewer = () => {
	const { openModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();
	useLeaveUser();

	const feedbackList = useRecoilValue(feedbackListSelector);
	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const setDocsUUID = useSetRecoilState(docsUUIDState);

	const me = useRecoilValue(meInRoomState);

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
		<div css={flexRow({ gap: '8px' })}>
			<RoundButton
				style={{
					width: 104,
					color: 'red',
				}}
				onClick={hadleEndInterview}
			>
				<StopIcon />
			</RoundButton>
			<RoundButton
				style={{
					width: 48,
					color: 'secondary',
				}}
				onClick={hadleCancelInterview}
			>
				<CancelIcon />
			</RoundButton>
		</div>
	);

	return (
		<div css={interviewerWrapperStyle}>
			<div css={interviewerContainerStyle}>
				<div css={interviewerVideoAreaStyle}>
					<IntervieweeVideo
						key={interviewee.uuid}
						src={interviewee.stream}
						nickname={interviewee.nickname}
						width="100%"
						autoplay
						audio={interviewee.audio}
						isMyStream={interviewee.uuid === me.uuid}
					/>
					<div css={VideoListAreaStyle}>
						{interviewerList.map((interviewer) => (
							<StreamVideo
								key={interviewer.uuid}
								src={interviewer.stream}
								nickname={interviewer.nickname}
								width="33%"
								audio={interviewer.audio}
								isMyStream={interviewer.uuid === me.uuid}
							/>
						))}
					</div>
					<BottomBar mainController={endInterviewBtn} />
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

export const interviewerVideoAreaStyle = (theme) => css`
	${flexColumn({ gap: '24px', justifyContent: 'center' })};

	width: 50%;
	height: calc(100% - ${theme.bottomBarHeight});
	padding: 24px;
	background-color: ${theme.colors.tertiary};
`;

export const VideoListAreaStyle = () => css`
	${flexRow({ gap: '20px', justifyContent: 'center' })};
	width: 100%;
`;
