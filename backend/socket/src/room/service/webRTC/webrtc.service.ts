import { EVENT, ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Namespace, Socket } from 'socket.io';
import { WebrtcBaseDto } from 'src/room/dto/webrtc.dto';
import { RoomRepository } from '../../repository/room.repository';

@Injectable()
export class WebrtcService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	async startSignaling(client: Socket) {
		const user = await this.roomRepository.getUserByClientId(client.id);

		client.to(user.roomUUID).emit(EVENT.RECEIVE_SIGNALING, { userUUID: user.uuid });

		return {};
	}

	async delivery({
		client,
		connectSignal,
		eventType,
	}: {
		client: Socket;
		connectSignal: WebrtcBaseDto;
		eventType: EVENT;
	}) {
		const { myId, opponentId } = connectSignal;
		const opponentClientId = await this.roomRepository.getClientIdByUser(opponentId);

		client
			.to(opponentClientId)
			.emit(eventType, { ...connectSignal, myId: opponentId, opponentId: myId });

		return {};
	}

	async disconnectWebrtc(client: Socket) {
		const user = await this.roomRepository.getUserByClientId(client.id);
		if (!user) return;

		client.to(user.roomUUID).emit(EVENT.DISCONNECT_WEBRTC, { userUUID: user.uuid });
	}
}
