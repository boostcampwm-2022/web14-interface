import {
	MAX_USER_COUNT,
	EVENT,
	ROOM_REPOSITORY_INTERFACE,
	ROOM_PHASE,
	ERROR_MSG,
	USER_ROLE,
} from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Namespace, Socket } from 'socket.io';
import { InmemoryRoom, User } from 'src/types/room.type';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from '../../repository/interface-room.repository';
// import { getRandomNickname } from '@woowa-babble/random-nickname';

@Injectable()
export class ConnectionService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	/**
	 * uuid를 기반으로 방을 생성하고 저장하는 메서드입니다.
	 * @returns uuid - 방의 uuid
	 */
	createRoom() {
		const room = this.createDefaultRoom();
		this.roomRepository.createRoom({ roomUUID: room.roomUUID, room });

		return { data: { uuid: room.roomUUID } };
	}

	/**
	 * default user를 생성하고 roomUUID에 해당하는 room에 유저가 들어가는 메서드입니다.
	 * @param client - client socket
	 * @param roomUUID - room uuid
	 * @returns
	 */
	enterRoom({ client, roomUUID }: { client: Socket; roomUUID: string }) {
		const room = this.roomRepository.getRoom(roomUUID);

		const exception = this.isEnterableRoom(room);
		if (exception) return exception;

		const user = this.createDefaultUser(roomUUID);
		const others = this.roomRepository.getUsersInRoom(roomUUID);

		client.join(roomUUID);
		this.roomRepository.saveUserInRoom({ clientId: client.id, roomUUID, user });
		client.to(roomUUID).emit(EVENT.ENTER_USER, { user });

		return { data: { others, me: user } };
	}

	/**
	 * 해당 방이 실제로 들어갈 수 있는지 체크하는 메서드입니다.
	 * @param room room instance
	 * @returns
	 */
	isEnterableRoom(room: InmemoryRoom) {
		if (room === undefined) {
			return { success: false, message: ERROR_MSG.NO_ROOM };
		}

		if (room.phase !== ROOM_PHASE.LOBBY) {
			return { success: false, message: ERROR_MSG.BUSY_ROOM };
		}

		const users = this.roomRepository.getUsersInRoom(room.roomUUID);
		const countInRoom = users.length;
		if (countInRoom >= MAX_USER_COUNT) {
			return { success: false, message: ERROR_MSG.FULL_ROOM };
		}

		return null;
	}

	/**
	 * 방에서 해당 유저를 제거하고, 나머지 유저들에게 emit을 하는 메서드입니다.
	 * @param client - client socket
	 */
	leaveRoom(client: Socket) {
		const user = this.roomRepository.getUserByClientId(client.id);
		if (!user) return;

		const roomUUID = user.roomUUID;
		this.roomRepository.removeUserInRoom({ roomUUID, user });

		client.to(roomUUID).emit(EVENT.LEAVE_USER, { user });

		client.leave(roomUUID);

		const usersInRoom = this.roomRepository.getUsersInRoom(roomUUID);
		if (!usersInRoom) {
			this.roomRepository.deleteRoom(roomUUID);
		}

		return {};
	}

	/**
	 * default room을 생성해서 반환합니다.
	 * @returns room
	 */
	createDefaultRoom(): InmemoryRoom {
		return { roomUUID: uuidv4(), phase: ROOM_PHASE.LOBBY };
	}

	/**
	 * default user를 생성해서 반환합니다.
	 * @returns user
	 */
	createDefaultUser(roomUUID: string): User {
		const users = this.roomRepository.getUsersInRoom(roomUUID);
		const uuid = uuidv4();

		let nickname = '';
		do {
			// nickname = getRandomNickname('monsters');
			nickname = uuidv4();
		} while (users.find((user) => user.nickname === nickname));

		return { uuid, nickname, role: USER_ROLE.NONE, roomUUID };
	}
}
