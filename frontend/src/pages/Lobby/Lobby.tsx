import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import VideoGrid from '@components/@shared/VideoGrid/VideoGrid';
import BottomBar from '@components/BottomBar/BottomBar';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import useWebRTCSignaling from '@hooks/useWebRTCSignaling';
import { meInRoomState, othersInRoomState } from '@store/room.store';
import { webRTCStreamSelector, webRTCUserMapState } from '@store/webRTC.store';

import { socket } from '../../service/socket';
import { UserType } from '@customType/user';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { PAGE_TYPE } from '@constants/page.constant';
import { iconBgStyle } from '@styles/commonStyle';
import { lobbyWrapperStyle, VideoAreaStyle } from './Lobby.style';
import { ReactComponent as BroadcastIcon } from '@assets/icon/broadcast.svg';
import RoundButton from '@components/@shared/RoundButton/RoundButton';
import StreamVideo from '@components/@shared/StreamingVideo/StreamVideo';
import useModal from '@hooks/useModal';

const Lobby = () => {
	usePreventLeave();
	const { safeNavigate } = useSafeNavigate();
	const { openModal } = useModal();
	const [me, setMe] = useRecoilState<UserType>(meInRoomState);
	const [others, setOthers] = useRecoilState<UserType[]>(othersInRoomState);
	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserMapState);
	const { startConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);
	const streamList = useRecoilValue(webRTCStreamSelector);

	useEffect(() => {
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
		if (!webRTCUserList.has(me.uuid)) {
			startConnection(me.uuid);
			openModal('RoomInfoModal', { value: me.roomUUID });
		}
	}, []);

	const handleStartInterviewee = async () => {
		openModal('StartInterviewModal', { me, setMe, others, setOthers });
	};

	const startInterviewBtn = (
		<RoundButton
			onClick={handleStartInterviewee}
			style={{
				width: 180,
				height: 50,
			}}
		>
			<BroadcastIcon {...iconBgStyle} />
			<span>면접 시작</span>
		</RoundButton>
	);

	return (
		<div css={lobbyWrapperStyle}>
			<div css={VideoAreaStyle}>
				<VideoGrid>
					{streamList.map(({ uuid, stream }) => (
						<StreamVideo key={uuid} src={stream} nickname={uuid} muted />
					))}
				</VideoGrid>
			</div>
			<BottomBar mainController={startInterviewBtn} />
		</div>
	);
};

export default Lobby;
