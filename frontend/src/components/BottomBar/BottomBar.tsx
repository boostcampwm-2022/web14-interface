import React, { useState } from 'react';

import ChatDrawer from '@components/@drawer/ChatDrawer/ChatDrawer';
import UserDrawer from '@components/@drawer/UserDrawer/UserDrawer';
import RecordDrawer from '@components/@drawer/RecordDrawer/RecordDrawer';

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
import theme from '@styles/theme';
import { iconBgStyle } from '@styles/commonStyle';
import { socketEmit } from '@api/socket.api';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import { PAGE_TYPE } from '@constants/page.constant';
import useCleanupRoom from '@hooks/useCleanupRoom';
import useModal from '@hooks/useModal';
import { useRecoilValue } from 'recoil';
import { pageState } from '@store/page.store';

interface Props {
	mainController?: React.ReactNode;
}

enum DRAWER_TYPE {
	CHAT_DRAWER = 'Chat',
	USER_DRAWER = 'User',
	RECORD_DRAWER = 'Record',
}

const BottomBar = ({ mainController }: Props) => {
	const { openModal } = useModal();
	const page = useRecoilValue(pageState);
	const [isMicOn, setIsMicOn] = useState(true);
	const [isCameraOn, setIsCameraOn] = useState(true);

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

	const drawerContentsSwitch = () => {
		switch (drawerCategory) {
			case DRAWER_TYPE.CHAT_DRAWER:
				return <ChatDrawer />;
			case DRAWER_TYPE.USER_DRAWER:
				return <UserDrawer />;
			case DRAWER_TYPE.RECORD_DRAWER:
				return <RecordDrawer />;
		}
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

	return (
		<>
			<div css={bottomBarStyle}>
				<div css={iconGroupStyle}>
					<button>
						<UserIcon {...iconBgStyle} />
					</button>

					<div css={horzLineStyle} />
					{isMicOn ? (
						<button onClick={() => setIsMicOn(false)}>
							<MicOnIcon {...iconBgStyle} />
						</button>
					) : (
						<button onClick={() => setIsMicOn(true)}>
							<MicOffIcon {...iconBgStyle} fill={theme.colors.red} />
						</button>
					)}
					{isCameraOn ? (
						<button onClick={() => setIsCameraOn(false)}>
							<CameraOnIcon {...iconBgStyle} />
						</button>
					) : (
						<button onClick={() => setIsCameraOn(true)}>
							<CameraOffIcon {...iconBgStyle} fill={theme.colors.red} />
						</button>
					)}
				</div>
				{mainController}
				<div css={iconGroupStyle}>
					<button onClick={() => handleToggleDrawer(DRAWER_TYPE.CHAT_DRAWER)}>
						<ChatIcon {...iconBgStyle} />
					</button>
					<button onClick={() => handleToggleDrawer(DRAWER_TYPE.USER_DRAWER)}>
						<UsersIcon {...iconBgStyle} />
					</button>
					<button onClick={() => handleToggleDrawer(DRAWER_TYPE.RECORD_DRAWER)}>
						<FolderIcon {...iconBgStyle} />
					</button>
					<div css={horzLineStyle} />
					<button onClick={handleLeaveRoom}>
						<EnterIcon {...iconBgStyle} fill={theme.colors.red} />
					</button>
				</div>
			</div>
			<aside css={drawerStyle(isDrawerOpen)}>
				<div css={drawerHeaderStyle}>
					<div>{drawerCategory}</div>
					<button onClick={handleCloseDrawer}>
						<CloseIcon {...iconBgStyle} width={25} height={25} />
					</button>
				</div>
				<div>{drawerContentsSwitch()}</div>
			</aside>
		</>
	);
};

export default BottomBar;
