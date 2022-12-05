/*  */
import React, { useEffect } from 'react';
import { PAGE_TYPE } from '@constants/page.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { webRTCStreamSelector } from '@store/webRTC.atom';
import { useRecoilValue } from 'recoil';
import Video from '@components/@shared/Video/Video';
import { socket } from '../../service/socket';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import { userRoleSelector } from '@store/room.atom';

const Interviewee = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();

	const { interviewee, interviewerList } = useRecoilValue(userRoleSelector);
	const streamList = useRecoilValue(webRTCStreamSelector);
	const hadleEndInterview = () => {
		socket.emit('end_interview', (res) => {
			console.log(res);
		});
	};

	useEffect(() => {
		socket.on('start_waiting', () => {
			safeNavigate(PAGE_TYPE.WAITTING_PAGE);
		});
	}, []);

	const getStreamFromUUID = (uuid) => {
		return streamList.find((stream) => stream.uuid === uuid).stream;
	};

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
