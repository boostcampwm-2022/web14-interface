import React, { useEffect } from 'react';
import { PHASE_TYPE } from '@constants/phase.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import { useRecoilState, useRecoilValue } from 'recoil';
import { webRTCStreamSelector, webRTCUserListState } from '@store/webRTC.atom';
import useWebRTCSignaling from '@hooks/useWebRTCSignaling';
import { socket } from '../../service/socket';
import Video from '@components/@shared/Video/Video';

const Lobby = () => {
	const { safeNavigate } = useSafeNavigate();
	usePreventLeave();

	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserListState);
	const { startConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);

	const streamList = useRecoilValue(webRTCStreamSelector);

	useEffect(() => {
		//TODO roomUUID 받는 로직 추가
		const roomUUID = '123';
		socket.emit('enter_room', roomUUID, ({ success, data }) => {
			if (!success) {
				alert('Invalid Room');
				return;
			}

			const { me, others } = data;

			startConnection(me.uuid);
		});
	}, []);

	return (
		<>
			<div>Lobby</div>
			{streamList.map((stream) => (
				<Video key={stream.id} src={stream} width={400} autoplay muted />
			))}
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE)}>면접자 시작</button>
			<button onClick={() => safeNavigate(PHASE_TYPE.INTERVIEWER_PHASE)}>면접관 시작</button>
		</>
	);
};

export default Lobby;
