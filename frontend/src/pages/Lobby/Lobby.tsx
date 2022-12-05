import React, { useEffect, useState } from 'react';
import { PAGE_TYPE } from '@constants/page.constant';
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

interface joinInterviewResponseType {
	usersInRoom: UserDTO[];
}

const Lobby = () => {
	const { safeNavigate } = useSafeNavigate();
	const [me, setMe] = useRecoilState<UserDTO>(meInRoomState);
	const [others, setOthers] = useRecoilState<UserDTO[]>(othersInRoomState);

	usePreventLeave();

	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserListState);
	const { startConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);

	const streamList = useRecoilValue(webRTCStreamSelector);

	useEffect(() => {
		//TODO 변경된 부분 BE랑 맞추기
		socket.on(SOCKET_EVENT_TYPE.JOIN_INTERVIEW, ({ user: interviewee }) => {
			const newOthers = others.map((user) => {
				return user.uuid === interviewee.uuid
					? { ...user, role: 'interviewee' }
					: { ...user, role: 'interviewer' };
			});

			setOthers(newOthers);
			setMe({ ...me, role: 'interviewer' });

			safeNavigate(PAGE_TYPE.INTERVIEWER_PAGE);
		});

		socket.on(SOCKET_EVENT_TYPE.ENTER_USER, ({ user }) => {
			setOthers((prevOthers) => [...prevOthers, user]);
		});

		socket.on(SOCKET_EVENT_TYPE.LEAVE_USER, ({ user }) => {
			setOthers((prevOhters) => prevOhters.filter((other) => other.uuid !== user.uuid));
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.JOIN_INTERVIEW);
			socket.off(SOCKET_EVENT_TYPE.ENTER_USER);
			socket.off(SOCKET_EVENT_TYPE.LEAVE_USER);
		};
	}, [others]);

	useEffect(() => {
		//TODO Lobby 첫 렌더링 시가 아니라 첫 입장 시만 하기
		startConnection(me.uuid);
	}, []);

	const handleStartInterviewee = async () => {
		//TODO 변경된 부분 BE랑 맞추기
		await socketEmit<joinInterviewResponseType>(SOCKET_EVENT_TYPE.START_INTERVIEW);

		const newOthers = others.map((user) => {
			return { ...user, role: 'interviewer' };
		});

		setMe({ ...me, role: 'interviewee' });
		setOthers(newOthers);
		safeNavigate(PAGE_TYPE.INTERVIEWEE_PAGE);
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
