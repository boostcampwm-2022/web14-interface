import { END_FLAG, MAX_COUNT, ROOM_EVENT, ROOM_STATE } from '@constant';
import { WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { repositoryType } from 'src/types/room.type';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository<repositoryType> {
	repository = {};
	sockets = {};
	roomState = {};
	feedbackCounter = {};

	createRoom(uuid: string) {
		this.repository[uuid] = {};
		this.roomState[uuid] = ROOM_STATE.LOBBY;
		this.feedbackCounter[uuid] = new Set();
	}
	enterRoom({ clientId, roomUUID }: { clientId: string; roomUUID: string }) {
		if (Object.keys(this.repository[uuid]).length >= MAX_COUNT)
			throw new WsException('인원 초과');
		if (clientId in this.repository[uuid]) throw new WsException('Internal Serval Error');
		this.repository[uuid][clientId] = nickname;
		this.sockets[clientId] = uuid;
	}
	broadcastUserList(clientId: string, server: Server, eventType: string): string {
		const uuid = this.sockets[clientId];
		const state = this.roomState[uuid];

		const res = JSON.stringify({
			data: this.repository[uuid],
			state,
		});

		server.to(uuid).emit(eventType, res);
		return res;
	}

	leaveRoom(client: Socket) {
		if (!(client.id in this.sockets)) return;
		const uuid = this.sockets[client.id];

		client.leave(uuid);

		delete this.repository[uuid][client.id];
		if (!Object.keys(this.repository[uuid])) {
			delete this.repository[uuid];
			delete this.roomState[uuid];
			delete this.feedbackCounter[uuid];
		}
		// delete this.sockets[client.id];
	}

	changeRoomState(client: Socket, state: string) {
		const uuid = this.sockets[client.id];
		this.roomState[uuid] = state;
	}

	countFeedback(clientId: string, server: Server) {
		const uuid = this.sockets[clientId];
		if (this.feedbackCounter[uuid].has(clientId)) throw new WsException('이미 카운트되었음');

		this.feedbackCounter[uuid].add(clientId);

		server.to(uuid).emit(ROOM_EVENT.COUNT_FEEDBACK, this.feedbackCounter[uuid].size);
		if (this.feedbackCounter[uuid].size == MAX_COUNT - 1) {
			server.to(uuid).emit(ROOM_EVENT.TERMINATE_SESSION);
			return END_FLAG;
		}
		return this.feedbackCounter[uuid].size;
	}
}
