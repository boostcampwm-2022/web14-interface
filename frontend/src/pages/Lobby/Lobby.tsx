import React, { useEffect } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { useRecoilState, useRecoilValue } from 'recoil';
import { webRTCMyStreamState, webRTCStreamSelector, webRTCUserListState } from '@store/webRTC.atom';
import useWebRTCSignaling from '@hooks/useWebRTC';
import { socket } from '../../service/socket';
import Video from '@components/@shared/Video/Video';

const Lobby = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const [myStream, setMyStream] = useRecoilState(webRTCMyStreamState);
	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserListState);
	const { startConnection } = useWebRTCSignaling(setMyStream, webRTCUserList, setWebRTCUserList);

	const streamList = useRecoilValue(webRTCStreamSelector);

	useEffect(() => {
		socket.emit('enter_room', startConnection);
	}, []);

	return (
		<>
			<div>Lobby</div>
			<Video src={myStream} width={400} autoplay muted />
			{streamList.map((stream) => (
				<Video key={stream} src={stream} width={400} autoplay muted />
			))}
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE)}>면접자 시작</button>
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWER_PHASE)}>면접관 시작</button>
		</>
	);
};

export default Lobby;
