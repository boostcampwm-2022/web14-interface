import { EVENT, ROOM_PHASE, ROOM_REPOSITORY_INTERFACE, USER_ROLE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@types';
import { Socket, Namespace } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';
import { RoomRepository } from 'src/room/repository/interface-room.repository';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	startInterview({ client, server }: { client: Socket; server: Namespace }) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;

		if (!this.isValidPhaseUpdate({ roomUUID, phase: ROOM_PHASE.INTERVIEW })) return;
		this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.INTERVIEW });

		const usersInRoom = this.roomRepository.getUsersInRoom(roomUUID);
		this.updateUsersRoleAtStartInterview({ emitter: user, users: usersInRoom });

		server.to(roomUUID).emit(EVENT.JOIN_INTERVIEW);

		return new SocketResponseDto({ success: true });
	}

	endInterview({ client, server }: { client: Socket; server: Namespace }) {
		const uuid = uuidv4();

		const emitter = this.roomRepository.getUserByClientId(client.id);
		const clientListInRoom = [...server.adapter.rooms.get(emitter.roomUUID)];

		const interviewers = [];
		clientListInRoom.forEach((clientId) => {
			const user = this.roomRepository.getUserByClientId(clientId);
			if (user.role === USER_ROLE.INTERVIEWEE) {
				server.to(clientId).emit(EVENT.START_WAITING, { uuid });
			} else if (user.role === USER_ROLE.INETRVIEWER) {
				server.to(clientId).emit(EVENT.START_FEEDBACK, { uuid });
				interviewers.push(clientId);
			}
		});

		// TODO video object storage upload
		// interviewers.forEach((clientId) => {
		// 	server.to(clientId).emit(EVENT.LOAD_VIDEO, { videoUrl: '~' });
		// });
	}

	updateUsersRoleAtStartInterview({ emitter, users }: { emitter: User; users: User[] }) {
		users.forEach((user) => {
			if (emitter.uuid === user.uuid) {
				this.roomRepository.updateUserRole({
					uuid: emitter.uuid,
					role: USER_ROLE.INTERVIEWEE,
				});
				return;
			}

			this.roomRepository.updateUserRole({
				uuid: user.uuid,
				role: USER_ROLE.INETRVIEWER,
			});
		});
	}

	updateUsersRoleAtEndInterview(users: User[]) {
		users.forEach((user) =>
			this.roomRepository.updateUserRole({ uuid: user.uuid, role: USER_ROLE.NONE })
		);
	}

	isValidPhaseUpdate({ roomUUID, phase }: { roomUUID: string; phase: string }) {
		const currentPhase = this.roomRepository.getRoomPhase(roomUUID);
		if (currentPhase === ROOM_PHASE.LOBBY && phase === ROOM_PHASE.INTERVIEW) return true;
		if (currentPhase === ROOM_PHASE.INTERVIEW && phase === ROOM_PHASE.FEEDBACK) return true;
		if (currentPhase === ROOM_PHASE.FEEDBACK && phase === ROOM_PHASE.LOBBY) return true;
		return false;
	}
}
