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
import { SOCKET_EVENT_TYPE } from '@constants/event.constant';
import VideoGrid from '@components/@shared/VideoGrid/VideoGrid';
import { socketEmit } from '@api/socket.api';
import { UserDTO } from '@customType/user';
import { css } from '@emotion/react';

const Lobby = () => {
	const { safeNavigate } = useSafeNavigate();
	const me = useRecoilValue<UserDTO>(meInRoomState);
	const [others, setOthers] = useRecoilState<UserDTO[]>(othersInRoomState);

	usePreventLeave();

	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserListState);
	const { startConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);

	const streamList = useRecoilValue(webRTCStreamSelector);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.JOIN_INTERVIEW, () => {
			safeNavigate(PHASE_TYPE.INTERVIEWER_PHASE);
		});

		socket.on(SOCKET_EVENT_TYPE.ENTER_ROOM, ({ user }) => {
			setOthers((prevOthers) => [...prevOthers, user]);
		});

		socket.on(SOCKET_EVENT_TYPE.LEAVE_USER, ({ user }) => {
			setOthers((prevOhters) => prevOhters.filter((other) => other.uuid !== user.uuid));
		});

		startConnection(me.uuid);
	}, []);
	
	const handleStartInterviewee = async () => {
		await socketEmit(SOCKET_EVENT_TYPE.START_INTERVIEW);

		safeNavigate(PHASE_TYPE.INTERVIEWEE_PHASE);
	};

	return (
		<div css={LobbyWrapperStyle}>
			<div css={VideoAreaStyle}>
				<VideoGrid>
					{streamList.map(({ uuid, stream }) => (
						<Video key={uuid} src={stream} autoplay muted />
					))}
				</VideoGrid>
			</div>
			<div css={bottomBarStyle}>
				<div>
					<button>Profile</button>
					<button>Mic</button>
					<button>Camera</button>
				</div>
				<div>
					<button onClick={handleStartInterviewee}>면접 시작</button>
					<button>중지</button>
					<button>취소</button>
				</div>
				<div>
					<button>채팅</button>
					<button>유저</button>
					<button>기록</button>
					<button>나가기</button>
				</div>
			</div>
		</div>
	);
};

export default Lobby;

const LobbyWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	background-color: ${theme.colors.primary3};
`;

const VideoAreaStyle = () => css`
	display: flex;
	justify-content: center;
	align-content: center;

	width: 100%;
	height: calc(100% - 72px);
`;

const bottomBarStyle = (theme) => css`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 72px;
	background-color: ${theme.colors.titleActive};

	button {
		color: ${theme.colors.white};
	}
`;
