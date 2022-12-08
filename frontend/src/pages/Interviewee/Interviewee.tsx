import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import Video from '@components/@shared/Video/Video';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { webRTCStreamSelector, webRTCUserMapState } from '@store/webRTC.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { docsUUIDState, userRoleSelector } from '@store/room.store';

import { socket } from '@service/socket';
import mediaStreamer from '@service/mediaStreamer';
import { PAGE_TYPE } from '@constants/page.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { socketEmit } from '@api/socket.api';
import { REST_TYPE } from '@constants/rest.constant';
import { DocsReqDtoType } from '@customType/dto';
import { intervieweeWrapperStyle } from './Interviewee.style';
import BottomBar from '@components/BottomBar/BottomBar';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import theme from '@styles/theme';

const Interviewee = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();
	const { startStream, stopStream } = mediaStreamer();

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const webRTCUserMap = useRecoilValue(webRTCUserMapState);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);
	const streamList = useRecoilValue(webRTCStreamSelector);
	const setDocsUUID = useSetRecoilState(docsUUIDState);

	const hadleEndInterview = () => {
		socketEmit(SOCKET_EVENT_TYPE.END_INTERVIEW);
	};

	const getStreamFromUUID = (uuid) => {
		return streamList.find((stream) => stream.uuid === uuid).stream;
	};

	useEffect(() => {
		const effect = () => {
			console.log('E!');
			if (!interviewee) return;
			const myStream = getStreamFromUUID(interviewee.uuid);
			if (!myStream) return;
			startStream(myStream);
		};
		effect();
		return stopStream;
	}, []);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.START_WAITING, ({ docsUUID }) => {
			setDocsUUID(docsUUID);
			socketEmit('finish_streaming', docsUUID);
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
		<RoundButton
			style={{
				backgroundColor: theme.colors.primary,
				width: 200,
				height: 50,
				color: theme.colors.white,
			}}
			onClick={hadleEndInterview}
		>
			<div>피드백 종료</div>
		</RoundButton>
	);

	return (
		<div css={intervieweeWrapperStyle}>
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
			<BottomBar mainController={endInterviewBtn} />
		</div>
	);
};

export default Interviewee;
