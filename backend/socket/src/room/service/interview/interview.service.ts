import {
	ERROR_MSG,
	EVENT,
	MIN_USER_COUNT,
	ROOM_PHASE,
	ROOM_REPOSITORY_INTERFACE,
	USER_ROLE,
} from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { Socket, Namespace } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from 'src/room/repository/room.repository';
import { User } from '@types';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}

	async startInterview(client: Socket) {
		const user = await this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;
		const usersInRoom = await this.roomRepository.getUsersInRoom(roomUUID);

		if (usersInRoom.length < MIN_USER_COUNT) {
			return { success: false, message: ERROR_MSG.NOT_ENOUGHT_USER };
		}
		await this.validateRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.INTERVIEW });

		await this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.INTERVIEW });
		await this.updateUsersRoleAtStartInterview({ emitter: user, users: usersInRoom });

		client.to(roomUUID).emit(EVENT.JOIN_INTERVIEW, { user });

		return {};
	}

	async endInterview({ client, server }: { client: Socket; server: Namespace }) {
		const docsUUID = uuidv4();

		const user = await this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;
		const usersInRoom = await this.roomRepository.getUsersInRoom(roomUUID);

		await this.validateRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.FEEDBACK });
		await this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.FEEDBACK });

		usersInRoom.forEach(async (user) => {
			const clientId = await this.roomRepository.getClientIdByUser(user.uuid);

			const emitEvent = this.getEventAtEndInterviewByRole(user.role);
			server.to(clientId).emit(emitEvent, { docsUUID });
		});

		return {};
	}

	getEventAtEndInterviewByRole(role: string) {
		switch (role) {
			case USER_ROLE.INTERVIEWEE:
				return EVENT.START_WAITING;
			case USER_ROLE.INTERVIEWER:
				return EVENT.START_FEEDBACK;
			default:
				throw new WsException(ERROR_MSG.BAD_REQUEST);
		}
	}

	async endFeedback({ client, server }: { client: Socket; server: Namespace }) {
		const user = await this.roomRepository.getUserByClientId(client.id);
		const users = await this.roomRepository.getUsersInRoom(user.roomUUID);
		const MAX_FEEDBACK_COUNT = users.length - 1;

		await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.FEEDBACKED });
		const currentFeedbackCount = await this.getFeedbackEndCount(user.roomUUID);

		return currentFeedbackCount < MAX_FEEDBACK_COUNT
			? await this.inProgressCycle({ server, count: currentFeedbackCount, users })
			: await this.terminateCycle({ server, user, users });
	}

	async inProgressCycle({
		server,
		count,
		users,
	}: {
		server: Namespace;
		count: number;
		users: User[];
	}) {
		const interviewee = users.find((user) => user.role === USER_ROLE.INTERVIEWEE);
		const clientId = await this.roomRepository.getClientIdByUser(interviewee.uuid);
		server.to(clientId).emit(EVENT.COUNT_FEEDBACK, { count });

		return { data: { isLastFeedback: false, count } };
	}

	async terminateCycle({
		server,
		user,
		users,
	}: {
		server: Namespace;
		user: User;
		users: User[];
	}) {
		const roomUUID = user.roomUUID;

		await this.validateRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.LOBBY });
		await this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.LOBBY });

		await this.updateUsersRoleAtEndInterview(users);
		server.to(roomUUID).emit(EVENT.TERMINATE_SESSION);

		return { data: { isLastFeedback: true } };
	}

	async getFeedbackEndCount(roomUUID: string) {
		const users = await this.roomRepository.getUsersInRoom(roomUUID);

		const count = users.reduce((prev, user) => {
			if (user.role === USER_ROLE.FEEDBACKED) prev += 1;
			return prev;
		}, 0);

		return count;
	}

	async updateUserRole({ uuid, role }: { uuid: string; role: USER_ROLE }) {
		await this.roomRepository.updateUserInfo({ uuid, updateUser: { role } });
	}

	async updateUsersRoleAtStartInterview({ emitter, users }: { emitter: User; users: User[] }) {
		users.forEach(async (user) => {
			if (emitter.uuid === user.uuid) {
				await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.INTERVIEWEE });
				return;
			}
			await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.INTERVIEWER });
		});
	}

	async updateUsersRoleAtEndInterview(users: User[]) {
		users.forEach(async (user) => {
			await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.NONE });
		});
	}

	async validateRoomPhaseUpdate({ roomUUID, phase }: { roomUUID: string; phase: string }) {
		const currentPhase = await this.roomRepository.getRoomPhase(roomUUID);
		if (currentPhase === ROOM_PHASE.LOBBY && phase === ROOM_PHASE.INTERVIEW) return true;
		if (currentPhase === ROOM_PHASE.INTERVIEW && phase === ROOM_PHASE.FEEDBACK) return true;
		if (currentPhase === ROOM_PHASE.FEEDBACK && phase === ROOM_PHASE.LOBBY) return true;

		throw new WsException(ERROR_MSG.BAD_REQUEST);
	}
}
