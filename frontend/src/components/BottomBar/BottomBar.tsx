import React, { useState } from 'react';

import ChatDrawer from '@components/@drawer/ChatDrawer/ChatDrawer';
import UserDrawer from '@components/@drawer/UserDrawer/UserDrawer';

import { ReactComponent as UserIcon } from '@assets/icon/user.svg';
import { ReactComponent as MicOnIcon } from '@assets/icon/mic_on.svg';
import { ReactComponent as MicOffIcon } from '@assets/icon/mic_off.svg';
import { ReactComponent as CameraOnIcon } from '@assets/icon/camera_on.svg';
import { ReactComponent as CameraOffIcon } from '@assets/icon/camera_off.svg';

import { ReactComponent as ChatIcon } from '@assets/icon/chat.svg';
import { ReactComponent as UsersIcon } from '@assets/icon/users.svg';
import { ReactComponent as FolderIcon } from '@assets/icon/folder.svg';
import { ReactComponent as EnterIcon } from '@assets/icon/enter.svg';

import { ReactComponent as CloseIcon } from '@assets/icon/close.svg';

import {
	bottomBarStyle,
	iconGroupStyle,
	horzLineStyle,
	drawerStyle,
	drawerHeaderStyle,
} from './BottomBar.style';
import { PAGE_TYPE } from '@constants/page.constant';
import useModal from '@hooks/useModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageState } from '@store/page.store';
import BottomBarButtom from '@components/@shared/BottomBarButton/BottomBarButton';
import Button from '@components/@shared/Button/Button';
import { meInRoomState, userInfoSelector } from '@store/user.store';
import useSocket from '@hooks/useSocket';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';

interface Props {
	mainController?: React.ReactNode;
}

enum DRAWER_TYPE {
	CHAT_DRAWER = 'Chat',
	USER_DRAWER = 'User',
}

const BottomBar = ({ mainController }: Props) => {
	const { openModal } = useModal();
	const { socketEmit } = useSocket();
	const page = useRecoilValue(pageState);
	const [me, setMe] = useRecoilState(meInRoomState);
	const userInfo = useRecoilValue(userInfoSelector);

	const myStream = userInfo.find((user) => user.uuid === me.uuid);

	const [isMicOn, setIsMicOn] = useState(me.audio);
	const [isCameraOn, setIsCameraOn] = useState(me.video);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerCategory, setDrawerCategory] = useState<DRAWER_TYPE>(null);

	const handleToggleDrawer = (category) => {
		if (isDrawerOpen && drawerCategory === category) {
			setIsDrawerOpen(false);
			return;
		}

		setIsDrawerOpen(true);
		setDrawerCategory(category);
	};

	const handleCloseDrawer = () => {
		//TODO leave에 사용될 cleanup 훅을 만들어야 함, 지금은 오염된 전역상태가 그대로 남아있음.
		setIsDrawerOpen(false);
		setDrawerCategory(null);
	};

	const handleLeaveRoom = () => {
		const exitRoomProp =
			page === PAGE_TYPE.LOBBY_PAGE
				? null
				: {
						content:
							page === PAGE_TYPE.WAITTING_PAGE
								? '작성된 피드백은 기록 메뉴에서 확인할 수 있습니다.'
								: '현재까지 진행 상황이 저장되지 않습니다.',
				  };

		openModal('ExitRoomModal', exitRoomProp);
	};

	const drawerContentsSwitch = () => {
		switch (drawerCategory) {
			case DRAWER_TYPE.CHAT_DRAWER:
				return <ChatDrawer />;
			case DRAWER_TYPE.USER_DRAWER:
				return <UserDrawer />;
		}
	};

	const handleMic = () => {
		myStream.stream.getAudioTracks().forEach((track) => {
			track.enabled = !isMicOn;
			console.log('오디오', track.enabled);
		});

		socketEmit(SOCKET_EVENT_TYPE.UPDATE_MEDIA_INFO, { audio: !isMicOn });
		setMe({ ...me, audio: !isMicOn });
		setIsMicOn((current) => !current);
	};

	const handleCamera = () => {
		myStream.stream.getVideoTracks().forEach((track) => {
			track.enabled = !isCameraOn;
			console.log('비디오', track.enabled);
		});

		socketEmit(SOCKET_EVENT_TYPE.UPDATE_MEDIA_INFO, { video: !isCameraOn });
		setMe({ ...me, video: !isCameraOn });
		setIsCameraOn((current) => !current);
	};

	return (
		<>
			<div css={bottomBarStyle}>
				<div css={iconGroupStyle}>
					<BottomBarButtom>
						<UserIcon />
					</BottomBarButtom>
					<div css={horzLineStyle} />
					<BottomBarButtom color={isMicOn ? 'secondary' : 'red'} onClick={handleMic}>
						{isMicOn ? <MicOnIcon /> : <MicOffIcon />}
					</BottomBarButtom>
					<BottomBarButtom
						color={isCameraOn ? 'secondary' : 'red'}
						onClick={handleCamera}
					>
						{isCameraOn ? <CameraOnIcon /> : <CameraOffIcon />}
					</BottomBarButtom>
					<BottomBarButtom visibility={'hidden'} disabled={true}>
						<UserIcon />
					</BottomBarButtom>
				</div>
				{mainController}
				<div css={iconGroupStyle}>
					<BottomBarButtom onClick={() => handleToggleDrawer(DRAWER_TYPE.CHAT_DRAWER)}>
						<ChatIcon />
					</BottomBarButtom>
					<BottomBarButtom onClick={() => handleToggleDrawer(DRAWER_TYPE.USER_DRAWER)}>
						<UsersIcon />
					</BottomBarButtom>
					<BottomBarButtom
						onClick={() => openModal('InterviewDocsModal', { roomUUID: me.roomUUID })}
					>
						<FolderIcon />
					</BottomBarButtom>
					<div css={horzLineStyle} />
					<BottomBarButtom color="red" onClick={handleLeaveRoom}>
						<EnterIcon />
					</BottomBarButtom>
				</div>
			</div>
			<aside css={drawerStyle(isDrawerOpen)}>
				<div css={drawerHeaderStyle}>
					<div>{drawerCategory}</div>
					<Button
						style="text"
						color="secondary"
						size="medium"
						onClick={handleCloseDrawer}
					>
						<CloseIcon />
					</Button>
				</div>
				{drawerContentsSwitch()}
			</aside>
		</>
	);
};

export default BottomBar;
