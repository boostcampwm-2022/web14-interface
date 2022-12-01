import React, { useEffect } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { useRecoilState, useRecoilValue } from 'recoil';
import { webRTCStreamSelector, webRTCUserListState } from '@store/webRTC.atom';
import useWebRTCSignaling from '@hooks/useWebRTCSignaling';
import { socket } from '../../service/socket';
import Video from '@components/@shared/Video/Video';
import { meInRoomState, othersInRoomState } from '@store/room.atom';

const Lobby = () => {
	const { safeNavigate } = useSafeNavigate();
	const me = useRecoilValue(meInRoomState);
	const [others, setOthers] = useRecoilState(othersInRoomState);

	usePreventLeave();

	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserListState);
	const { startConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);

	const streamList = useRecoilValue(webRTCStreamSelector);

	// useEffect(() => {
	// 	startConnection(me.uuid);
	// }, []);

	useEffect(() => {
		socket.on('join_interview', () => {
			safeNavigate(PHASE_TYPE.INTERVIEWER_PHASE);
		});
	}, []);

	const handleStartInterviewee = () => {
		socket.emit('start_interview', () => {
			safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE);
		});
	};

	return (
		<>
			<div>Lobby</div>
			{streamList.map((stream) => (
				<Video key={stream.id} src={stream} width={400} autoplay muted />
			))}
			<button onClick={handleStartInterviewee}>면접자로 시작</button>
		</>
	);
};

export default Lobby;
