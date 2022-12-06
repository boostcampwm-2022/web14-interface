import React from 'react';
import { useRecoilValue } from 'recoil';

import { meInRoomState, othersInRoomState } from '@store/room.atom';
import { ReactComponent as CopyIcon } from '@assets/icon/copy.svg';
import { ReactComponent as MicOnIcon } from '@assets/icon/mic_on.svg';
import { ReactComponent as MicOffIcon } from '@assets/icon/mic_off.svg';
import { ReactComponent as CameraOnIcon } from '@assets/icon/camera_on.svg';
import { ReactComponent as CameraOffIcon } from '@assets/icon/camera_off.svg';
import {
	dividerStyle,
	drawerBottomBoxStyle,
	roomUUIDStyle,
	userListStyle,
} from './UserDrawer.style';
import { iconSmStyle } from '@styles/commonStyle';

const UserDrawer = () => {
	const others = useRecoilValue(othersInRoomState);
	const me = useRecoilValue(meInRoomState);

	return (
		<>
			<div css={userListStyle}>
				{others.map((other, i) => (
					<div key={i}>
						<div>{other.nickname}</div>
						<div>
							<MicOnIcon {...iconSmStyle} />
							<CameraOnIcon {...iconSmStyle} />
						</div>
					</div>
				))}
			</div>
			<div css={drawerBottomBoxStyle}>
				<div css={dividerStyle} />
				<div css={roomUUIDStyle}>
					{me.roomUUID}
					<button onClick={() => navigator.clipboard.writeText(me.roomUUID)}>
						<CopyIcon {...iconSmStyle} />
					</button>
				</div>
			</div>
		</>
	);
};

export default UserDrawer;
