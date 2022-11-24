import { END_FLAG, MAX_COUNT, ROOM_EVENT, ROOM_REPOSITORY_INTERFACE, ROOM_STATE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketResponseDto } from 'src/dto/socket-response.dto';
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

	createRoom() {
		const roomUUID = uuidv4();
		const room = this.createDefaultRoom();

		this.roomRepository.createRoom({ roomUUID, room });

		return roomUUID;
	}

	enterRoom({ client, server, roomUUID }: { client: Socket; server: Server; roomUUID: string }) {
		client.join(roomUUID);

		const room = this.roomRepository.getRoom(roomUUID);

		const validateResult = this.IsInvalidEnterableRoom(room);
		if (validateResult) return validateResult;

		const user = this.createDefaultUser(roomUUID);
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

	IsInvalidEnterableRoom(room: InmemoryRoom) {
		if (!room) {
			return new SocketResponseDto({ success: false, message: 'no room' });
		}

		if (room.state !== ROOM_STATE.LOBBY) {
			return new SocketResponseDto({ success: false, message: 'invalid state' });
		}

		const countInRoom = room.users.size;
		if (countInRoom >= MAX_COUNT) {
			return new SocketResponseDto({ success: false, message: 'full room' });
		}

		return false;
	}

	// leaveRoom(client: Socket, server: Server) {
	// 	this.roomRepository.leaveRoom(client);
	// 	this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.USER_ENTER);
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

	// leaveRoom(client: Socket) {
	// 	if (!(client.id in this.sockets)) return;
	// 	const uuid = this.sockets[client.id];

	// 	client.leave(uuid);

	// 	delete this.repository[uuid][client.id];
	// 	if (!Object.keys(this.repository[uuid])) {
	// 		delete this.repository[uuid];
	// 		delete this.roomState[uuid];
	// 		delete this.feedbackCounter[uuid];
	// 	}
	// 	// delete this.sockets[client.id];
	// }

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

	createDefaultRoom(): InmemoryRoom {
		return { users: new Map(), state: ROOM_STATE.LOBBY, feedbacked: new Set() };
	}

	createDefaultUser(roomUUID: string): User {
		const users = this.roomRepository.getUsersInRoom(roomUUID);

		let nickname = '';
		do {
			nickname = getRandomNickname('monsters');
		} while (users.has(nickname));

		return { nickname, role: '', roomUUID };
	}
}
