import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import VideoGrid from '@components/@shared/VideoGrid/VideoGrid';
import BottomBar from '@components/BottomBar/BottomBar';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import useWebRTCSignaling from '@hooks/useWebRTCSignaling';
import {
	meInRoomState,
	othersInRoomState,
	userInfoSelector,
	webRTCUserMapState,
} from '@store/user.store';

import { socket } from '../../service/socket';
import { UserType } from '@customType/user';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { PAGE_TYPE } from '@constants/page.constant';
import { lobbyWrapperStyle, lobbyVideoAreaStyle } from './Lobby.style';
import { ReactComponent as BroadcastIcon } from '@assets/icon/broadcast.svg';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import StreamVideo from '@components/@shared/StreamingVideo/StreamVideo';
import useModal from '@hooks/useModal';
import { useUserRole } from '@hooks/useUserRole';
import ussCommonSocketEvent from '@hooks/useCommonSocketEvent';
import useCleanupInterview from '@hooks/useCleanupInterview';

const Lobby = () => {
	usePreventLeave();
	ussCommonSocketEvent();

	const { safeNavigate } = useSafeNavigate();
	const { openModal } = useModal();
	const cleanupInterview = useCleanupInterview();

	const [me, setMe] = useRecoilState<UserType>(meInRoomState);
	const [others, setOthers] = useRecoilState<UserType[]>(othersInRoomState);
	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserMapState);
	const { setUserRole } = useUserRole();

	const { startConnection, closeConnection } = useWebRTCSignaling(
		webRTCUserList,
		setWebRTCUserList
	);
	const userInfoList = useRecoilValue(userInfoSelector);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.ENTER_USER, ({ user }) => {
			setOthers((prevOthers) => [...prevOthers, user]);
		});

		socket.on(SOCKET_EVENT_TYPE.JOIN_INTERVIEW, ({ user: interviewee }) => {
			setUserRole(interviewee);
			safeNavigate(PAGE_TYPE.INTERVIEWER_PAGE);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.JOIN_INTERVIEW);
			socket.off(SOCKET_EVENT_TYPE.ENTER_USER);
		};
	}, [others]);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.LEAVE_USER, ({ user }) => {
			closeConnection(user);
			setOthers((prevOthers) => prevOthers.filter((other) => other.uuid !== user.uuid));
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.LEAVE_USER);
		};
	}, [others, webRTCUserList]);

	useEffect(() => {
		cleanupInterview();
		if (!webRTCUserList.has(me.uuid)) {
			startConnection(me.uuid);
			if (!others.length) openModal('RoomInfoModal', { value: me.roomUUID });
		}
	}, []);

	const handleStartInterviewee = async () => {
		openModal('StartInterviewModal', { me, setMe, others, setOthers });
	};

	const startInterviewBtn = (
		<RoundButton
			onClick={handleStartInterviewee}
			style={{
				width: 160,
			}}
		>
			<BroadcastIcon />
			<span>면접 시작</span>
		</RoundButton>
	);

	return (
		<div css={lobbyWrapperStyle}>
			<div css={lobbyVideoAreaStyle}>
				<VideoGrid>
					{userInfoList.map(({ uuid, stream, nickname, audio }) => (
						<StreamVideo
							key={uuid}
							src={stream}
							nickname={nickname}
							isMyStream={uuid === me.uuid}
							audio={audio}
						/>
					))}
				</VideoGrid>
			</div>
			<BottomBar mainController={startInterviewBtn} />
		</div>
	);
};

export default Lobby;
