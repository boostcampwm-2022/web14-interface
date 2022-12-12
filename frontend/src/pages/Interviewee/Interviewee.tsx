import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { userRoleSelector } from '@store/user.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { docsUUIDState } from '@store/interview.store';

import { socket } from '@service/socket';
import mediaStreamer from '@service/mediaStreamer';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { socketEmit } from '@api/socket.api';
import { REST_TYPE } from '@constants/rest.constant';
import { DocsReqDtoType } from '@customType/dto';
import { intervieweeWrapperStyle, VideoListAreaStyle } from './Interviewee.style';
import BottomBar from '@components/BottomBar/BottomBar';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import StreamVideo from '@components/@shared/StreamingVideo/StreamVideo';
import useModal from '@hooks/useModal';
import useLeaveUser from '@hooks/useLeaveUser';
import { ReactComponent as StopIcon } from '@assets/icon/stop.svg';
import { ReactComponent as CancelIcon } from '@assets/icon/close.svg';
import { flexRow } from '@styles/globalStyle';

const Interviewee = () => {
	usePreventLeave();
	useLeaveUser();
	const { openModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	const { startStream, stopStream } = mediaStreamer();

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);
	const setDocsUUID = useSetRecoilState(docsUUIDState);

	const hadleEndInterview = () => {
		openModal('EndInterviewModal');
	};

	const hadleCancelInterview = () => {
		openModal('CancelInterviewModal');
	};

	useEffect(() => {
		const effect = () => {
			if (!interviewee) return;
			const myStream = interviewee.stream;
			if (!myStream) return;
			startStream(myStream);
		};
		effect();
		return stopStream;
	}, []);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.START_WAITING, ({ docsUUID }) => {
			setDocsUUID(docsUUID);
			socketEmit(SOCKET_EVENT_TYPE.FINISH_STREAMING, docsUUID);
			const docsRequestDto: DocsReqDtoType = {
				roomUUID: interviewee.roomUUID,
				docsUUID,
				videoPlayTime: currentVideoTime,
			};
			axios.post(REST_TYPE.INTERVIEW_DOCS, docsRequestDto);
			safeNavigate(PAGE_TYPE.WAITTING_PAGE);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.START_WAITING);
		};
	}, [currentVideoTime]);

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
		<div css={intervieweeWrapperStyle}>
			<div css={VideoListAreaStyle}>
				{interviewerList.map((interviewer) => (
					<StreamVideo
						key={interviewer.uuid}
						src={interviewer.stream}
						nickname={interviewer.nickname}
						height={'100%'}
						muted
					/>
				))}
			</div>
			<IntervieweeVideo
				key={interviewee.uuid}
				src={interviewee.stream}
				nickname={interviewee.nickname}
				height="64%"
				autoplay
				muted
			/>

			<BottomBar mainController={endInterviewBtn} />
		</div>
	);
};

export default Interviewee;
