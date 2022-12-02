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

	startSignaling({ client, server }: { client: Socket; server: Namespace }) {
		const user = this.roomRepository.getUserByClientId(client.id);

		server.to(user.roomUUID).emit(EVENT.RECEIVE_SIGNALING, { userUUID: user.uuid });
		return {};
	}

	delivery({
		server,
		connectSignal,
		eventType,
	}: {
		server: Namespace;
		connectSignal: WebrtcBaseDto;
		eventType: EVENT;
	}) {
		const { opponentId } = connectSignal;
		const opponentClientId = this.roomRepository.getClientIdByUser(opponentId);

		server.to(opponentClientId).emit(eventType, { connectSignal });
		return {};
	}

	disconnectWebrtc({ client, server }: { client: Socket; server: Namespace }) {
		const user = this.roomRepository.getUserByClientId(client.id);

		server.to(user.roomUUID).emit(EVENT.DISCONNECT_WEBRTC, { userUUID: user.uuid });
	}
}
