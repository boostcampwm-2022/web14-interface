import React, { useState } from 'react';
import { PAGE_TYPE } from '@constants/page.constant';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';
import axios from 'axios';
import { meInRoomState, othersInRoomState, roomUUIDState } from '@store/room.atom';
import { useSetRecoilState } from 'recoil';
import { SOCKET_EVENT_TYPE } from '@constants/event.constant';
import { socketEmit } from '../../api/socket.api';
import { UserDTO } from '@customType/user';
import { ReactComponent as InterfacePreview } from '@assets/preview.svg';
import { ReactComponent as Logo } from '@assets/logo_black.svg';
import { ReactComponent as FolderIcon } from '@assets/icon/folder.svg';
import { ReactComponent as PlusIcon } from '@assets/icon/plus.svg';
import {
	folderIconStyle,
	headerBtnGroupStyle,
	headerStyle,
	historyBtn,
	landingWrapperStyle,
	LargeBtn,
	logoStyle,
	logoutBtn,
	mainBtnGroupStyle,
	mainStyle,
	plusIconStyle,
	previewStyle,
	primaryBtn,
	secondaryBtn,
	MediumBtn,
} from './Landing.style';

interface createRoomResponseType {
	uuid: string;
}

interface attendRoomResponseType {
	others: UserDTO[];
	me: UserDTO;
}

const Landing = () => {
	usePreventLeave();
	const [roomNumber, setRoomNumber] = useState('');
	const setRoom = useSetRecoilState(roomUUIDState);
	const setOthers = useSetRecoilState<UserDTO[]>(othersInRoomState);
	const setMe = useSetRecoilState<UserDTO>(meInRoomState);

	const { safeNavigate } = useSafeNavigate();

	const handleSignOut = async () => {
		const res = await axios.get('/api/auth/logout');
		alert(res.data.statusCode);
		safeNavigate(PAGE_TYPE.LOGIN_PAGE);
	};

	const handleCreate = async () => {
		const { uuid } = await socketEmit<createRoomResponseType>(SOCKET_EVENT_TYPE.CRERATE_ROOM);
		setRoom(uuid);
		handleAttendRoom(uuid);
	};

	const handleAttendRoom = async (roomUUID) => {
		const { others, me } = await socketEmit<attendRoomResponseType>(
			SOCKET_EVENT_TYPE.ENTER_ROOM,
			roomUUID
		);

		setOthers(others);
		setMe(me);
		safeNavigate(PAGE_TYPE.LOBBY_PAGE);
	};

	//TODO 닉네임 로딩 반영 -> 소켓 Suspense howt?
	return (
		<div css={landingWrapperStyle}>
			<header css={headerStyle}>
				<button>
					<Logo css={logoStyle} />
				</button>
				<div css={headerBtnGroupStyle}>
					<button css={[MediumBtn, historyBtn]}>
						<FolderIcon css={folderIconStyle} />
						기록
					</button>
					<button css={[MediumBtn, logoutBtn]} onClick={handleSignOut}>
						로그아웃
					</button>
				</div>
			</header>
			<main css={mainStyle}>
				<span>interface님, 안녕하세요!</span>
				<div css={mainBtnGroupStyle}>
					<button css={[LargeBtn, primaryBtn]} onClick={handleCreate}>
						<PlusIcon css={plusIconStyle} />방 만들기
					</button>
					<button
						css={[LargeBtn, secondaryBtn]}
						onClick={() => handleAttendRoom(roomNumber)}
					>
						참가하기
					</button>
					<input
						type="text"
						placeholder="방번호를 입력하세요"
						value={roomNumber}
						onChange={(e) => setRoomNumber(e.target.value)}
					/>
				</div>
				<InterfacePreview css={previewStyle} />
			</main>
		</div>
	);
};

export default Landing;
