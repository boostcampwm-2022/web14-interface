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
		socket.on('change_user', ({ user }) => {
			setOthers((prevOthers) => [...prevOthers, user]);
		});
		//TODO: 전역 소켓 이벤트 리스너 어케 할건지..? -> exception handler도
		// socket.on('leaver_user', ({ user }) => {
		// 	setOthers((prevOhters) => prevOhters.filter((other) => other.uuid !== user.uuid));
		// });
	}, []);

	const handleStartInterviewee = () => {
		socket.emit('start_interview', (res) => {
			const { success, message } = res;
			if (!success) {
				alert(message);
				return;
			}
			safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE);
		});
	};

	return (
		<>
			<div>Lobby</div>
			{streamList.map((stream) => (
				<Video key={stream.id} src={stream} width={400} autoplay muted />
			))}
			{JSON.stringify(me)}
			{others.map((user, i) => (
				<div key={i}>{JSON.stringify(user)}</div>
			))}
			<button onClick={handleStartInterviewee}>면접자로 시작</button>
		</>
	);
};

export default Lobby;
