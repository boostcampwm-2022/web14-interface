import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Video from '@components/@shared/Video/Video';
import BottomBar from '@components/BottomBar/BottomBar';

import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import useWebRTCSignaling from '@hooks/useWebRTCSignaling';
import { webRTCStreamSelector, webRTCUserListState } from '@store/webRTC.atom';
import { meInRoomState, othersInRoomState } from '@store/room.atom';
import { socket } from '../../service/socket';

import { ReactComponent as BroadcastIcon } from '@assets/icon/broadcast.svg';
import { ReactComponent as CopyIcon } from '@assets/icon/copy.svg';
import { PHASE_TYPE } from '@constants/phase.constant';
import { iconBgStyle } from '@styles/commonStyle';
import { lobbyWrapperStyle, startInterviewBtnStyle } from './Lobby.style';

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

	const startInterviewBtn = (
		<button css={startInterviewBtnStyle} onClick={handleStartInterviewee}>
			<BroadcastIcon {...iconBgStyle} />
			<div>면접시작</div>
		</button>
	);

	return (
		<div css={lobbyWrapperStyle}>
			{streamList.map((stream) => (
				<Video key={stream.id} src={stream} width={400} autoplay muted />
			))}
			<div style={{ color: 'white', fontSize: '20px', padding: '0px 30px' }}>
				room uuid:
				{me.roomUUID}
				<button onClick={() => navigator.clipboard.writeText(me.roomUUID)}>
					<CopyIcon width={30} height={30} fill="white" />
				</button>
			</div>

			<BottomBar mainController={startInterviewBtn} />
		</div>
	);
};

export default Lobby;
