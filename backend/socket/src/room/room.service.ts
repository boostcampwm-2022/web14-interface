import { MAX_COUNT, ROOM_EVENT, ROOM_REPOSITORY_INTERFACE, ROOM_STATE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';
import { InmemoryRoom, User } from 'src/types/room.type';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from './repository/interface-room.repository';
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
		client.join(roomUUID);

		const room = this.roomRepository.getRoom(roomUUID);

		const exception = this.IsEnterableRoom(room);
		if (exception) return exception;

		const user = this.createDefaultUser(roomUUID);
		this.roomRepository.setUserByClientId({ clientId: client.id, user });
		this.roomRepository.saveUserInRoom({ roomUUID, user });

		this.broadcastInRoom({
			clientId: client.id,
			server,
			eventType: ROOM_EVENT.USER_ENTER,
			data: { user },
		});

		const users = this.roomRepository.getUsersInRoom(roomUUID);
		return { data: users };
	}

	/**
	 * 해당 방이 실제로 들어갈 수 있는지 체크하는 메서드입니다.
	 * @param room room instance
	 * @returns
	 */
	IsEnterableRoom(room: InmemoryRoom): SocketResponseDto | null {
		if (room === undefined) {
			return new SocketResponseDto({ success: false, message: 'no room' });
		}

		if (room.state !== ROOM_STATE.LOBBY) {
			return new SocketResponseDto({ success: false, message: 'invalid state' });
		}

		const countInRoom = room.users.size;
		if (countInRoom >= MAX_COUNT) {
			return new SocketResponseDto({ success: false, message: 'full room' });
		}

		return null;
	}

	/**
	 * 방에서 해당 유저를 제거하고, 나머지 유저들에게 emit을 하는 메서드입니다.
	 * @param client - client socket
	 * @param server - server instance
	 */
	leaveRoom(client: Socket, server: Server) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;

		this.roomRepository.removeUserInRoom({ roomUUID, user });
		client.leave(roomUUID);

		const users = this.roomRepository.getUsersInRoom(roomUUID);
		this.broadcastInRoom({
			clientId: client.id,
			server,
			eventType: ROOM_EVENT.USER_ENTER,
			data: { users },
		});
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

		const response = new SocketResponseDto({ success: true, data });
		server.to(roomUUID).emit(eventType, response);
	}

	/**
	 * default room을 생성해서 반환합니다.
	 * @returns room
	 */
	createDefaultRoom(): InmemoryRoom {
		return { users: new Map(), state: ROOM_STATE.LOBBY, feedbacked: new Set() };
	}

	/**
	 * default user를 생성해서 반환합니다.
	 * @returns user
	 */
	createDefaultUser(roomUUID: string): User {
		const users = this.roomRepository.getUsersInRoom(roomUUID);

		let nickname = '';
		do {
			nickname = getRandomNickname('monsters');
		} while (users.has(nickname));

		return { nickname, role: '', roomUUID };
	}

	// changeRoomState(client: Socket, state: string) {
	// 	const uuid = this.sockets[client.id];
	// 	this.roomState[uuid] = state;
	// }

	// countFeedback(clientId: string, server: Server) {
	// 	const uuid = this.sockets[clientId];
	// 	if (this.feedbackCounter[uuid].has(clientId)) throw new WsException('이미 카운트되었음');

	// 	this.feedbackCounter[uuid].add(clientId);

	// 	server.to(uuid).emit(ROOM_EVENT.COUNT_FEEDBACK, this.feedbackCounter[uuid].size);
	// 	if (this.feedbackCounter[uuid].size == MAX_COUNT - 1) {
	// 		server.to(uuid).emit(ROOM_EVENT.TERMINATE_SESSION);
	// 		return END_FLAG;
	// 	}
	// 	return this.feedbackCounter[uuid].size;
	// }

	// startInterview(client: Socket, server: Server) {
	// 	this.roomRepository.changeRoomState(client, ROOM_STATE.INTERVIEW);
	// 	return this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.JOIN_INTERVIEW);
	// }

	// endInterview(client: Socket, server: Server) {
	// 	this.roomRepository.changeRoomState(client, ROOM_STATE.FEEDBACK);
	// 	return this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.END_INTERVIEW);
	// }

	// endFeedback(client: Socket, server: Server) {
	// 	// const feedbackCount = this.roomRepository.countFeedback(client.id, server);
	// 	// if (feedbackCount == END_FLAG) {
	// 	// 	client.emit(ROOM_EVENT.TERMINATE_SESSION);
	// 	// } else {
	// 	// 	client.emit(ROOM_EVENT.COUNT_FEEDBACK, feedbackCount);
	// 	// }
	// }
}
