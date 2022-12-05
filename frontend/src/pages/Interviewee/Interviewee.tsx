import React, { useEffect } from 'react';
import { PAGE_TYPE } from '@constants/page.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { webRTCStreamSelector, webRTCUserMapState } from '@store/webRTC.atom';
import { useRecoilValue } from 'recoil';
import Video from '@components/@shared/Video/Video';
import { socket } from '../../service/socket';
import mediaStreamer from '@service/mediaStreamer';
import { userRoleSelector } from '@store/room.atom';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import { socketEmit } from '@api/socket.api';

const Interviewee = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();
	const { startStream, stopStream } = mediaStreamer();

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const webRTCUserMap = useRecoilValue(webRTCUserMapState);

	const streamList = useRecoilValue(webRTCStreamSelector);
	const hadleEndInterview = () => {
		socketEmit('end_interview');
	};

	const getStreamFromUUID = (uuid) => {
		return streamList.find((stream) => stream.uuid === uuid).stream;
	};

	useEffect(() => {
		socket.on('start_waiting', ({ docsUUID }) => {
			console.log(docsUUID);

			safeNavigate(PAGE_TYPE.WAITTING_PAGE);
			stopStream(docsUUID);
		});
	}, []);

	useEffect(() => {
		const effect = () => {
			if (!interviewee) return;
			const myStream = getStreamFromUUID(interviewee.uuid);
			if (!myStream) return;
			startStream(myStream);
		};
		effect();
	}, [webRTCUserMap, interviewee]);

	return (
		<>
			<div>Interviewee</div>
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
			<button onClick={hadleEndInterview}>면접 종료</button>
		</>
	);
};

export default Interviewee;
