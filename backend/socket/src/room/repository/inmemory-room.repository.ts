import { MAX_COUNT, ROOM_EVENT } from '@constant';
import { WsException } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { repositoryType } from 'src/types/room.type';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository<repositoryType> {
	repository;
	createRoom(uuid: string) {
		this.repository[uuid] = {};
	}
	enterRoom(clientId: string, nickname: string, uuid: string) {
		if (Object.keys(this.repository).length >= MAX_COUNT) throw new WsException('인원 초과');
		if (clientId in this.repository[uuid]) throw new WsException('Internal Serval Error');
		this.repository[uuid][clientId] = nickname;
	}
	broadcastUserList(data: string, server: Server): void {
		const { uuid } = JSON.parse(data);
		server.to(uuid).emit(ROOM_EVENT.GET_USERLIST, data);
	}
}
