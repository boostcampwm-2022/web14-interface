import { MAX_COUNT, ROOM_EVENT } from '@constant';
import { WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { repositoryType } from 'src/types/room.type';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository<repositoryType> {
	repository = {};
	sockets = {};
	createRoom(uuid: string) {
		this.repository[uuid] = {};
	}
	enterRoom(clientId: string, nickname: string, uuid: string) {
		if (Object.keys(this.repository[uuid]).length >= MAX_COUNT)
			throw new WsException('인원 초과');
		if (clientId in this.repository[uuid]) throw new WsException('Internal Serval Error');
		this.repository[uuid][clientId] = nickname;
		this.sockets[clientId] = uuid;
	}
	broadcastUserList(clientId: string, server: Server): void {
		const uuid = this.sockets[clientId];

		server.to(uuid).emit(ROOM_EVENT.USER_ENTER, JSON.stringify(this.repository[uuid]));
	}

	leaveRoom(client: Socket) {
		if (!(client.id in this.sockets)) return;
		const uuid = this.sockets[client.id];

		client.leave(uuid);

		delete this.repository[uuid][client.id];
		if (!Object.keys(this.repository[uuid])) {
			delete this.repository[uuid];
		}
		// delete this.sockets[client.id];
	}
}
