import React, { useEffect } from 'react';
import { SOCKET_EVENT_TYPE } from '@constants/socket.constant';
import { UserType } from '@customType/user';
import { socket } from '@service/socket';
import { othersInRoomState, webRTCUserMapState } from '@store/user.store';
import { useRecoilState } from 'recoil';
import useWebRTCSignaling from './useWebRTCSignaling';

const ussCommonSocketEvent = () => {
	const [others, setOthers] = useRecoilState<UserType[]>(othersInRoomState);
	const [webRTCUserList, setWebRTCUserList] = useRecoilState(webRTCUserMapState);
	const { closeConnection } = useWebRTCSignaling(webRTCUserList, setWebRTCUserList);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.LEAVE_USER, ({ user }) => {
			closeConnection(user);
			setOthers((prevOhters) => prevOhters.filter((other) => other.uuid !== user.uuid));
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.LEAVE_USER);
		};
	}, [others, webRTCUserList]);

	useEffect(() => {
		socket.on(SOCKET_EVENT_TYPE.UPDATE_MEDIA_INFO, ({ user: changeUser }) => {
			const newUser = others
				.filter((user) => user.uuid !== changeUser.uuid)
				.concat(changeUser);

			console.log(changeUser, newUser);

			setOthers(newUser);
		});

		return () => {
			socket.off(SOCKET_EVENT_TYPE.LEAVE_USER);
		};
	}, []);

	return { others, setOthers, webRTCUserList, setWebRTCUserList };
};

export default ussCommonSocketEvent;
