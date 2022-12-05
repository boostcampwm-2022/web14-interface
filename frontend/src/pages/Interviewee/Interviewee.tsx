/*  */
import React, { useEffect } from 'react';
import { PAGE_TYPE } from '@constants/page.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { webRTCStreamSelector } from '@store/webRTC.atom';
import { useRecoilValue } from 'recoil';
import Video from '@components/@shared/Video/Video';
import { socket } from '../../service/socket';

const Interviewee = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();

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

	return (
		<>
			<div>Interviewee</div>
			{streamList.map((stream) => (
				<Video key={stream.id} src={stream} width={200} autoplay muted />
			))}
			<button onClick={hadleEndInterview}>면접 종료</button>
		</>
	);
};

export default Interviewee;
