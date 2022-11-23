import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { repositoryType } from 'src/types/room.type';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from './repository/interface-room.repository';

@Injectable()
export class RoomService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository<repositoryType>
	) {}

	createRoom() {
		const uuid = uuidv4();

		this.roomRepository.createRoom(uuid);

		return uuid;
	}

	enterRoom(client: Socket, data: string, server: Server) {
		const { nickname, uuid } = JSON.parse(data);
		client.join(uuid);
		this.roomRepository.enterRoom(client.id, nickname, uuid);

		this.roomRepository.broadcastUserList(data, server);
	}

	leaveRoom(client: Socket, data: string, server: Server) {
		const { uuid } = JSON.parse(data);
		client.leave(uuid);
		this.roomRepository.leaveRoom(data, client.id);
		this.roomRepository.broadcastUserList(data, server);
	}
}
