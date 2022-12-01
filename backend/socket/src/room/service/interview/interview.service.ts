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

		if (!this.isValidRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.INTERVIEW })) {
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

			const emitEvent = this.getEventAtEndInterviewByRole(user.role);
			server.to(clientId).emit(emitEvent, { docsUUID });
		});

		// TODO video object storage upload
	}

	getEventAtEndInterviewByRole(role: string) {
		switch (role) {
			case USER_ROLE.INTERVIEWEE:
				return EVENT.START_WAITING;
			case USER_ROLE.INTERVIEWER:
				return EVENT.START_FEEDBACK;
			default:
			// TODO exception handling
		}
	}

	endFeedback({ client, server }: { client: Socket; server: Namespace }) {
		const user = this.roomRepository.getUserByClientId(client.id);
		const users = this.roomRepository.getUsersInRoom(user.roomUUID);
		const MAX_FEEDBACK_COUNT = users.length - 1;

		this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.FEEDBACKED });
		const currentFeedbackCount = this.getFeedbackEndCount(user.roomUUID);

		return currentFeedbackCount < MAX_FEEDBACK_COUNT
			? this.inProgressCycle({ server, count: currentFeedbackCount, users })
			: this.terminateCycle({ server, user, users });
	}

	inProgressCycle({ server, count, users }: { server: Namespace; count: number; users: User[] }) {
		const interviewee = users.find((user) => user.role === USER_ROLE.INTERVIEWEE);
		const clientId = this.roomRepository.getClientIdByUser(interviewee.uuid);
		server.to(clientId).emit(EVENT.COUNT_FEEDBACK, { count });
		return new SocketResponseDto({ success: true, data: { isLastFeedback: false } });
	}

	terminateCycle({ server, user, users }: { server: Namespace; user: User; users: User[] }) {
		const roomUUID = user.roomUUID;

		if (!this.isValidRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.LOBBY })) {
			return new SocketResponseDto({
				success: false,
				message: ERROR_MSG.INVALID_REQUEST,
			});
		}
		this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.LOBBY });

		this.updateUsersRoleAtEndInterview(users);
		server.to(roomUUID).emit(EVENT.TERMINATE_SESSION);
		return new SocketResponseDto({ success: true, data: { isLastFeedback: true } });
	}

	getFeedbackEndCount(roomUUID: string) {
		const users = this.roomRepository.getUsersInRoom(roomUUID);

		const count = users.reduce((prev, user) => {
			if (user.role === USER_ROLE.FEEDBACKED) prev += 1;
			return prev;
		}, 0);

		return count;
	}

	updateUserRole({ uuid, role }: { uuid: string; role: USER_ROLE }) {
		this.roomRepository.updateUserInfo({ uuid, updateUser: { role } });
	}

	updateUsersRoleAtStartInterview({ emitter, users }: { emitter: User; users: User[] }) {
		users.forEach((user) => {
			if (emitter.uuid === user.uuid) {
				this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.INTERVIEWEE });
				return;
			}
			this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.INTERVIEWER });
		});
	}

	updateUsersRoleAtEndInterview(users: User[]) {
		users.forEach((user) => {
			this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.NONE });
		});
	}

	isValidRoomPhaseUpdate({ roomUUID, phase }: { roomUUID: string; phase: string }) {
		const currentPhase = this.roomRepository.getRoomPhase(roomUUID);
		if (currentPhase === ROOM_PHASE.LOBBY && phase === ROOM_PHASE.INTERVIEW) return true;
		if (currentPhase === ROOM_PHASE.INTERVIEW && phase === ROOM_PHASE.FEEDBACK) return true;
		if (currentPhase === ROOM_PHASE.FEEDBACK && phase === ROOM_PHASE.LOBBY) return true;
		return false;
	}
}
