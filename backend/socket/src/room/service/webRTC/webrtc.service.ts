import { EVENT, ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Namespace, Socket } from 'socket.io';
import { WebrtcBaseDto } from 'src/room/dto/webrtc.dto';
import { RoomRepository } from '../../repository/interface-room.repository';

@Injectable()
export class WebrtcService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	startSignaling(client: Socket) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const usersInRoom = this.roomRepository.getUsersInRoom(user.roomUUID);
		console.log(usersInRoom);

		client.to(user.roomUUID).emit(EVENT.RECEIVE_SIGNALING, { userUUID: user.uuid });
		return {};
	}

	delivery({
		client,
		connectSignal,
		eventType,
	}: {
		client: Socket;
		connectSignal: WebrtcBaseDto;
		eventType: EVENT;
	}) {
		const { myId, opponentId } = connectSignal;
		const opponentClientId = this.roomRepository.getClientIdByUser(opponentId);

		client
			.to(opponentClientId)
			.emit(eventType, { ...connectSignal, myId: opponentId, opponentId: myId });
		return {};
	}

	disconnectWebrtc(client: Socket) {
		const user = this.roomRepository.getUserByClientId(client.id);
		if (!user) return;

		client.to(user.roomUUID).emit(EVENT.DISCONNECT_WEBRTC, { userUUID: user.uuid });
	}
}
