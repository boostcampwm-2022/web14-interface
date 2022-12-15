import React from 'react';
import { useRecoilValue } from 'recoil';

import { ReactComponent as CopyIcon } from '@assets/icon/copy.svg';
import { ReactComponent as MicOnIcon } from '@assets/icon/mic_on.svg';
import { ReactComponent as MicOffIcon } from '@assets/icon/mic_off.svg';
import { ReactComponent as CameraOnIcon } from '@assets/icon/camera_on.svg';
import { ReactComponent as CameraOffIcon } from '@assets/icon/camera_off.svg';
import {
	dividerStyle,
	drawerBottomBoxStyle,
	offIconStyle,
	roomUUIDStyle,
	userIconStyle,
	userItemStyle,
	userListStyle,
} from './UserDrawer.style';
import { iconSmStyle } from '@styles/commonStyle';
import { meInRoomState, othersInRoomState } from '@store/user.store';
import Button from '@components/@shared/Button/Button';
import { toast } from 'react-toastify';

const UserDrawer = () => {
	const others = useRecoilValue(othersInRoomState);
	const me = useRecoilValue(meInRoomState);

	const copyRoomCode = async (roomInfo) => {
		await navigator.clipboard.writeText(roomInfo);
		toast('복사 완료', {
			position: 'bottom-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	};

	return (
		<>
			<div css={userListStyle}>
				<div css={userItemStyle}>
					<div>{me.nickname}</div>
					<div css={userIconStyle}>
						{me.audio ? (
							<MicOnIcon {...iconSmStyle} />
						) : (
							<MicOffIcon css={offIconStyle} {...iconSmStyle} />
						)}
						{me.video ? (
							<CameraOnIcon {...iconSmStyle} />
						) : (
							<CameraOffIcon css={offIconStyle} {...iconSmStyle} />
						)}
					</div>
				</div>
				{others.map((other, i) => (
					<div css={userItemStyle} key={i}>
						<div>{other.nickname}</div>
						<div css={userIconStyle}>
							{other.audio ? (
								<MicOnIcon {...iconSmStyle} />
							) : (
								<MicOffIcon css={offIconStyle} {...iconSmStyle} />
							)}
							{other.video ? (
								<CameraOnIcon {...iconSmStyle} />
							) : (
								<CameraOffIcon css={offIconStyle} {...iconSmStyle} />
							)}
						</div>
					</div>
				))}
			</div>
			<div css={drawerBottomBoxStyle}>
				<div css={dividerStyle} />
				<div css={roomUUIDStyle}>
					{me.roomUUID}
					<Button
						size="small"
						style="text"
						color="secondary"
						onClick={() => copyRoomCode(me.roomUUID)}
					>
						<CopyIcon />
					</Button>
				</div>
			</div>
		</>
	);
};

export default UserDrawer;
