import { MAX_USER_COUNT, EVENT, ROOM_REPOSITORY_INTERFACE, ROOM_PHASE, ERROR_MSG } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';
import { InmemoryRoom, User } from 'src/types/room.type';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from '../repository/interface-room.repository';
import { getRandomNickname } from '@woowa-babble/random-nickname';

@Injectable()
export class RoomService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	/**
	 * uuid를 기반으로 방을 생성하고 저장하는 메서드입니다.
	 * @returns uuid - 방의 uuid
	 */
	createRoom() {
		const roomUUID = uuidv4();
		const room = this.createDefaultRoom();

		this.roomRepository.createRoom({ roomUUID, room });

		return roomUUID;
	}

	/**
	 * default user를 생성하고 roomUUID에 해당하는 room에 유저가 들어가는 메서드입니다.
	 * @param client - client socket
	 * @param server - server 인스턴스
	 * @param roomUUID - room uuid
	 * @returns
	 */
	enterRoom({ client, server, roomUUID }: { client: Socket; server: Server; roomUUID: string }) {
		const room = this.roomRepository.getRoom(roomUUID);

		const exception = this.isEnterableRoom(room);
		if (exception) return exception;

		const user = this.createDefaultUser(roomUUID);
		const others = this.roomRepository.getUsersInRoom(roomUUID);

		client.join(roomUUID);
		this.roomRepository.saveUserInRoom({ roomUUID, user });
		this.roomRepository.setUserByClientId({ clientId: client.id, user });

		server.to(roomUUID).emit(EVENT.CHANGE_USER, { user });
		return { data: { others: others.values(), me: user } };
	}

	/**
	 * 해당 방이 실제로 들어갈 수 있는지 체크하는 메서드입니다.
	 * @param room room instance
	 * @returns
	 */
	isEnterableRoom(room: InmemoryRoom): SocketResponseDto | null {
		if (room === undefined) {
			return new SocketResponseDto({ success: false, message: ERROR_MSG.BUSY_ROOM });
		}

		if (room.state !== ROOM_PHASE.LOBBY) {
			return new SocketResponseDto({ success: false, message: ERROR_MSG.BUSY_ROOM });
		}

		const countInRoom = room.users.size;
		if (countInRoom >= MAX_USER_COUNT) {
			return new SocketResponseDto({ success: false, message: ERROR_MSG.FULL_ROOM });
		}

		return null;
	}

	/**
	 * 방에서 해당 유저를 제거하고, 나머지 유저들에게 emit을 하는 메서드입니다.
	 * @param client - client socket
	 * @param server - server instance
	 */
	leaveRoom({ client, server }: { client: Socket; server: Server }) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;

		this.roomRepository.removeUserInRoom({ roomUUID, user });
		client.leave(roomUUID);

		server.to(roomUUID).emit(EVENT.CHANGE_USER, { user });
	}

	/**
	 * broad cast 메서드 입니다.
	 * @param clientId - client socket id
	 * @param server - server instance
	 * @param eventType - emit event type
	 * @param data - emit으로 전달할 data
	 */
	broadcastInRoom({
		clientId,
		server,
		eventType,
		data,
	}: {
		clientId: string;
		server: Server;
		eventType: string;
		data: unknown;
	}) {
		const user = this.roomRepository.getUserByClientId(clientId);
		const roomUUID = user.roomUUID;

		server.to(roomUUID).emit(eventType, data);
	}

	/**
	 * default room을 생성해서 반환합니다.
	 * @returns room
	 */
	createDefaultRoom(): InmemoryRoom {
		return { users: new Map(), state: ROOM_PHASE.LOBBY, feedbacked: new Set() };
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
			nickname = getRandomNickname('monsters');
		} while (users.has(nickname));

		return { uuid, nickname, role: '', roomUUID };
	}
}
