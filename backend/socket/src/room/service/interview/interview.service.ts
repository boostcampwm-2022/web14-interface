import { EVENT, ROOM_PHASE, ROOM_REPOSITORY_INTERFACE, USER_ROLE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@types';
import { Socket, Server } from 'socket.io';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';
import { RoomRepository } from 'src/room/repository/interface-room.repository';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	startInterview({ client, server }: { client: Socket; server: Server }) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;

		if (!this.isValidPhaseUpdate({ roomUUID, phase: ROOM_PHASE.INTERVIEW })) return;

		this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.INTERVIEW });
		server.to(roomUUID).emit(EVENT.JOIN_INTERVIEW);

		return new SocketResponseDto({ success: true });
	}

	isValidPhaseUpdate({ roomUUID, phase }: { roomUUID: string; phase: string }) {
		const currentPhase = this.roomRepository.getRoomPhase(roomUUID);
		if (currentPhase === ROOM_PHASE.LOBBY && phase === ROOM_PHASE.INTERVIEW) return true;
		if (currentPhase === ROOM_PHASE.INTERVIEW && phase === ROOM_PHASE.FEEDBACK) return true;
		if (currentPhase === ROOM_PHASE.FEEDBACK && phase === ROOM_PHASE.LOBBY) return true;
		return false;
	}
}
