import { EVENT, ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
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

	/**
	 * 모든 시그널을 이벤트 이름에 따라 전달하는 메소드입니다.
	 * @param param0
	 */
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
		const opponent = await this.roomRepository.getUserByUserId(opponentId);

		client
			.to(opponent.clientId)
			.emit(eventType, { ...connectSignal, myId: opponentId, opponentId: myId });

		return {};
	}

	/**
	 * socket connection이 끊겼을 때 webRTC도 같이 끊어주는 메서드입니다.
	 * @param client Socket
	 */
	async disconnectWebrtc(client: Socket) {
		const user = await this.roomRepository.getUserByClientId(client.id);
		if (!user) return;

		client.to(user.roomUUID).emit(EVENT.DISCONNECT_WEBRTC, { userUUID: user.uuid });
	}
}
