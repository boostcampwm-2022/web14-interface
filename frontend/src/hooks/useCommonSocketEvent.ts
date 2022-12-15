import React, { useEffect } from 'react';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { UserType } from '@customType/user';
import { socket } from '@service/socket';
import { othersInRoomState, webRTCUserMapState } from '@store/user.store';
import { useRecoilState } from 'recoil';
import useWebRTCSignaling from './useWebRTCSignaling';
import { chatListState } from '@store/chatList.store';

const ussCommonSocketEvent = () => {
	const [others, setOthers] = useRecoilState<UserType[]>(othersInRoomState);
	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserMapState);
	const { closeConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);
	const [chatList, setChatList] = useRecoilState(chatListState);

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
		socket.on(SOCKET_EVENT_TYPE.RECEIVE_MESSAGE, ({ data }) => {
			const { chat } = data;

			setChatList([chat, ...chatList]);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.RECEIVE_MESSAGE);
		};
	}, [chatList]);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.UPDATE_MEDIA_INFO, ({ user: changeUser }) => {
			const newUser = others.reduce((acc, other) => {
				if (other.uuid !== changeUser.uuid) acc.push(other);
				else acc.push(changeUser);

				return acc;
			}, []);

			console.log(changeUser, newUser);

			setOthers(newUser);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.UPDATE_MEDIA_INFO);
		};
	}, [others]);

	return { others, setOthers, webRTCUserList, setWebRTCUserList };
};

export default ussCommonSocketEvent;
