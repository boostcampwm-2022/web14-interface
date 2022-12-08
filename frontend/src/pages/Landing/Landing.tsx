import React, { useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import isAuthQuery from '@store/auth.store';
import { meInRoomState, othersInRoomState, roomUUIDState } from '@store/room.store';
import useSafeNavigate from '@hooks/useSafeNavigate';
import usePreventLeave from '@hooks/usePreventLeave';

import { socketEmit } from '../../api/socket.api';
import { PAGE_TYPE } from '@constants/page.constant';
import { ROUTE_TYPE } from '@constants/route.constant';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { UserType } from '@customType/user';

import { flexColumn, flexRow } from '@styles/globalStyle';
import { ReactComponent as InterfacePreview } from '@assets/preview.svg';
import { ReactComponent as Logo } from '@assets/logo_black.svg';
import { ReactComponent as FolderIcon } from '@assets/icon/folder.svg';
import { ReactComponent as PlusIcon } from '@assets/icon/plus.svg';
import {
	headerStyle,
	introTextStyle,
	landingWrapperStyle,
	logoStyle,
	mainStyle,
	previewStyle,
} from './Landing.style';

interface createRoomResponseType {
	uuid: string;
}

interface attendRoomResponseType {
	others: UserType[];
	me: UserType;
}

const Landing = () => {
	usePreventLeave();
	const setRoom = useSetRecoilState(roomUUIDState);
	const setOthers = useSetRecoilState<UserType[]>(othersInRoomState);
	const setMe = useSetRecoilState<UserType>(meInRoomState);
	const refreshAuth = useRecoilRefresher_UNSTABLE(isAuthQuery);

	const { safeNavigate } = useSafeNavigate();
	const { openModal } = useModal();
	const naviagte = useNavigate();

	const handleSignOut = async () => {
		//TODO TOAST로 교체
		const res = await axios.get('/api/auth/logout');
		alert(res.status);
		refreshAuth();
		naviagte(ROUTE_TYPE.LOGIN_ROUTE);
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

	return (
		<div css={landingWrapperStyle}>
			<header css={headerStyle}>
				<Logo css={logoStyle} />
				<div css={flexRow({ gap: '8px' })}>
					<Button
						size="small"
						color="black"
						onClick={() => openModal(MODAL_TYPE.InterviewDocsModal)}
					>
						<FolderIcon />
						<span>기록</span>
					</Button>
					<Button size="small" color="red" onClick={handleSignOut}>
						<span>로그아웃</span>
					</Button>
				</div>
			</header>
			<main css={mainStyle}>
				<div css={flexColumn({ gap: '32px' })}>
					<div css={introTextStyle}>interface님, 안녕하세요!</div>
					<div css={flexRow({ gap: '16px' })}>
						<Button onClick={handleCreate} iconColor={true}>
							<PlusIcon />
							<span>방 만들기</span>
						</Button>
						<Button
							color="secondary"
							onClick={() => openModal(MODAL_TYPE.EnterRoomModal)}
						>
							<span>참가하기</span>
						</Button>
					</div>
				</div>
				<InterfacePreview css={previewStyle} />
			</main>
		</div>
	);
};

export default Landing;
