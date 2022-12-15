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
import { meInRoomState, othersInRoomState } from '@store/user.store';
import Button from '@components/@shared/Button/Button';
import useToast from '@hooks/useToast';

const UserDrawer = () => {
	const others = useRecoilValue(othersInRoomState);
	const me = useRecoilValue(meInRoomState);

	const { popToast } = useToast();

	const copyRoomCode = async (roomInfo) => {
		await navigator.clipboard.writeText(roomInfo);
		popToast('복사 완료');
	};

	return (
		<>
			<div css={userListStyle}>
				<div css={userItemStyle}>
					<div>{me.nickname}</div>
					<div css={userIconStyle}>
						{me.audio ? <MicOnIcon /> : <MicOffIcon css={offIconStyle} />}
						{me.video ? <CameraOnIcon /> : <CameraOffIcon css={offIconStyle} ㅇ />}
					</div>
				</div>
				{others.map((other, i) => (
					<div css={userItemStyle} key={i}>
						<div>{other.nickname}</div>
						<div css={userIconStyle}>
							{other.audio ? <MicOnIcon /> : <MicOffIcon css={offIconStyle} />}
							{other.video ? <CameraOnIcon /> : <CameraOffIcon css={offIconStyle} />}
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
