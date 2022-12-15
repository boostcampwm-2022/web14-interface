import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { meInRoomState, userRoleSelector } from '@store/user.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { docsUUIDState } from '@store/interview.store';

import { socket } from '@service/socket';
import useMediaStreamer from '@hooks/useMediaStreamer';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useSocket from '@hooks/useSocket';
import { REST_TYPE } from '@constants/rest.constant';
import { DocsReqDtoType } from '@customType/dto';
import { intervieweeWrapperStyle } from './Interviewee.style';
import BottomBar from '@components/BottomBar/BottomBar';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import StreamVideo from '@components/@shared/StreamingVideo/StreamVideo';
import useModal from '@hooks/useModal';
import ussCommonSocketEvent from '@hooks/useCommonSocketEvent';
import { ReactComponent as StopIcon } from '@assets/icon/stop.svg';
import { ReactComponent as CancelIcon } from '@assets/icon/close.svg';
import { flexRow } from '@styles/globalStyle';
import { videoAreaStyle, videoListStyle } from '@styles/commonStyle';
import RecordTimeLabel from '@components/RecordTimeLabel/RecordTimeLabel';

const Interviewee = () => {
	usePreventLeave();
	ussCommonSocketEvent();
	const { openModal } = useModal();
	const { safeNavigate } = useSafeNavigate();
	const { startStream, stopStream } = useMediaStreamer();
	const { socketEmit } = useSocket();

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);
	const setDocsUUID = useSetRecoilState(docsUUIDState);

	const me = useRecoilValue(meInRoomState);

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
			<RecordTimeLabel />
			<div css={videoAreaStyle}>
				<IntervieweeVideo
					key={interviewee.uuid}
					src={interviewee.stream}
					nickname={interviewee.nickname}
					autoplay
					audio={interviewee.audio}
					width={'100%'}
					isMyStream={interviewee.uuid === me.uuid}
				/>
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
			<BottomBar mainController={endInterviewBtn} />
		</div>
	);
};

export default Interviewee;
