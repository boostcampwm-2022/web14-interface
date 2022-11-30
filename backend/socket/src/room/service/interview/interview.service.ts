import { ERROR_MSG, EVENT, ROOM_PHASE, ROOM_REPOSITORY_INTERFACE, USER_ROLE } from '@constant';
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

		if (!this.isValidPhaseUpdate({ roomUUID, phase: ROOM_PHASE.INTERVIEW })) {
			return new SocketResponseDto({
				success: false,
				message: ERROR_MSG.INVALID_REQUEST,
			});
		}
		this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.INTERVIEW });

		const usersInRoom = this.roomRepository.getUsersInRoom(roomUUID);
		this.updateUsersRoleAtStartInterview({ emitter: user, users: usersInRoom });

		server.to(roomUUID).emit(EVENT.JOIN_INTERVIEW);

		return new SocketResponseDto({ success: true });
	}

	endInterview({ client, server }: { client: Socket; server: Namespace }) {
		const docsUUID = uuidv4();

		const user = this.roomRepository.getUserByClientId(client.id);
		const usersInRoom = this.roomRepository.getUsersInRoom(user.roomUUID);

		usersInRoom.forEach((user) => {
			const clientId = this.roomRepository.getClientIdByUser(user.uuid);
			if (user.role === USER_ROLE.INTERVIEWEE) {
				server.to(clientId).emit(EVENT.START_WAITING, { docsUUID });
			} else if (user.role === USER_ROLE.INETRVIEWER) {
				server.to(clientId).emit(EVENT.START_FEEDBACK, { docsUUID });
			}
		});

		// TODO video object storage upload
	}

	endFeedback({ client, server }: { client: Socket; server: Namespace }) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;
		const room = this.roomRepository.getRoom(roomUUID);
		const users = this.roomRepository.getUsersInRoom(roomUUID);
		const MAX_FEEDBACK_COUNT = users.length - 1;

		const currentFeedbackCount = room.feedbackCount;
		if (currentFeedbackCount < MAX_FEEDBACK_COUNT) {
			const newCount = this.roomRepository.updateFeedbackCount({
				roomUUID,
				count: currentFeedbackCount + 1,
			});
			const interviewee = users.find((user) => user.role === USER_ROLE.INTERVIEWEE);
			const clientId = this.roomRepository.getClientIdByUser(interviewee.uuid);
			server.to(clientId).emit(EVENT.COUNT_FEEDBACK, { count: newCount });
		} else {
			if (!this.isValidPhaseUpdate({ roomUUID, phase: ROOM_PHASE.LOBBY })) {
				return new SocketResponseDto({
					success: false,
					message: ERROR_MSG.INVALID_REQUEST,
				});
			}
			this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.LOBBY });

			this.roomRepository.updateFeedbackCount({ roomUUID, count: 0 });
			this.updateUsersRoleAtEndInterview(users);
			server.to(roomUUID).emit(EVENT.TERMINATE_SESSION);
			return new SocketResponseDto({ success: true, data: { isLastFeedback: true } });
		}

		return new SocketResponseDto({ success: true, data: { isLastFeedback: false } });
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
