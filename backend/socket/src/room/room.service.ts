import { END_FLAG, ROOM_EVENT, ROOM_REPOSITORY_INTERFACE, ROOM_STATE } from '@constant';
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

	enterRoom({ client, server, roomUUID }: { client: Socket; server: Server; roomUUID: string }) {
		client.join(roomUUID);

		this.roomRepository.enterRoom(client.id, nickname, uuid);

		this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.USER_ENTER);
	}

	leaveRoom(client: Socket, server: Server) {
		this.roomRepository.leaveRoom(client);
		this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.USER_ENTER);
	}

	startInterview(client: Socket, server: Server) {
		this.roomRepository.changeRoomState(client, ROOM_STATE.INTERVIEW);
		return this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.JOIN_INTERVIEW);
	}

	endInterview(client: Socket, server: Server) {
		this.roomRepository.changeRoomState(client, ROOM_STATE.FEEDBACK);
		return this.roomRepository.broadcastUserList(client.id, server, ROOM_EVENT.END_INTERVIEW);
	}

	endFeedback(client: Socket, server: Server) {
		const feedbackCount = this.roomRepository.countFeedback(client.id, server);
		if (feedbackCount == END_FLAG) {
			client.emit(ROOM_EVENT.TERMINATE_SESSION);
		} else {
			client.emit(ROOM_EVENT.COUNT_FEEDBACK, feedbackCount);
		}
	}
}
