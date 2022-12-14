import {
	EVENT,
	MIN_USER_COUNT,
	ROOM_PHASE,
	ROOM_REPOSITORY_INTERFACE,
	USER_ROLE,
	SOCKET_MESSAGE,
	EXCEPTION_MESSAGE,
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

	/**
	 * interview를 시작하고 나머지 유저들에게 시작을 알립니다.
	 * @param client Socket
	 */
	async startInterview(client: Socket) {
		const user = await this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;
		const usersInRoom = await this.roomRepository.getUsersInRoom(roomUUID);

		if (usersInRoom.length < MIN_USER_COUNT) {
			return { success: false, message: SOCKET_MESSAGE.NOT_ENOUGHT_USER };
		}
		await this.validateRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.INTERVIEW });

		await this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.INTERVIEW });
		await this.updateUsersRoleAtStartInterview({ emitter: user, users: usersInRoom });

		client.to(roomUUID).emit(EVENT.JOIN_INTERVIEW, { user });

		return {};
	}

	/**
	 * interview를 마치고 나머지 유저에게 종료를 알립니다.
	 * @param client Socket
	 * @param server Namespace
	 */
	async endInterview({ client, server }: { client: Socket; server: Namespace }) {
		const docsUUID = uuidv4();

		const user = await this.roomRepository.getUserByClientId(client.id);
		const roomUUID = user.roomUUID;
		const usersInRoom = await this.roomRepository.getUsersInRoom(roomUUID);

		await this.validateRoomPhaseUpdate({ roomUUID, phase: ROOM_PHASE.FEEDBACK });
		await this.roomRepository.updateRoomPhase({ roomUUID, phase: ROOM_PHASE.FEEDBACK });

		for (const user of usersInRoom) {
			const emitEvent = this.getEventAtEndInterviewByRole(user.role);
			server.to(user.clientId).emit(emitEvent, { docsUUID });
		}

		return {};
	}

	/**
	 * role에 따라 다음 phase의 이벤트를 반환합니다.
	 * @param role
	 * @returns
	 */
	getEventAtEndInterviewByRole(role: string) {
		switch (role) {
			case USER_ROLE.INTERVIEWEE:
				return EVENT.START_WAITING;
			case USER_ROLE.INTERVIEWER:
				return EVENT.START_FEEDBACK;
			default:
				throw new WsException(EXCEPTION_MESSAGE.INVALID_USER_ROLE);
		}
	}

	/**
	 * feedback을 종료합니다. 모든 면접관이 피드백을 마치면 cycle을 종료하는 값을 반환합니다.
	 * 그렇지 않다면 끝나지 않았다는 값을 반환합니다.
	 * @param param0
	 * @returns
	 */
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

	/**
	 * 모든 면접관이 피드백을 마친 경우가 아닌 경우 호출됩니다.
	 * @param server Namespace
	 * @param count 피드백 마친 사람 수
	 * @param users 같은 방에 속한 유저
	 * @returns { data: { isLastFeedback: false, count } };
	 */
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
		server.to(interviewee.clientId).emit(EVENT.COUNT_FEEDBACK, { count });

		return { data: { isLastFeedback: false, count } };
	}

	/**
	 * 모든 면접관이 피드백을 마친 경우 호출됩니다.
	 * @param server Namespace
	 * @param user 피드백을 마친 사람
	 * @param users 같은 방에 속한 유저
	 * @returns { data: { isLastFeedback: true } }
	 */
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

	/**
	 * 피드백을 마친 면접관의 수를 반환합니다.
	 * @param roomUUID room UUID
	 * @returns count
	 */
	async getFeedbackEndCount(roomUUID: string) {
		const users = await this.roomRepository.getUsersInRoom(roomUUID);

		const count = users.reduce((prev, user) => {
			if (user.role === USER_ROLE.FEEDBACKED) prev += 1;
			return prev;
		}, 0);

		return count;
	}

	/**
	 * uuid에 해당하는 유저의 role을 업데이트합니다.
	 * @param uuid user UUID
	 * @param role user role
	 */
	async updateUserRole({ uuid, role }: { uuid: string; role: USER_ROLE }) {
		await this.roomRepository.updateUserInfo({ uuid, updateUser: { role } });
	}

	/**
	 * 인터뷰가 시작될 때 유저의 role을 interviewee와 interviewer로 업데이트합니다.
	 * @param emitter 인터뷰 시작 버튼을 누른 유저
	 * @param users 같은 방에 속한 유저
	 */
	async updateUsersRoleAtStartInterview({ emitter, users }: { emitter: User; users: User[] }) {
		users.forEach(async (user) => {
			if (emitter.uuid === user.uuid) {
				await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.INTERVIEWEE });
				return;
			}
			await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.INTERVIEWER });
		});
	}

	/**
	 * 인터뷰가 끝났을 때 유저의 롤을 업데이트 합니다.
	 * @param users 같은 방에 속한 유저
	 */
	async updateUsersRoleAtEndInterview(users: User[]) {
		users.forEach(async (user) => {
			await this.updateUserRole({ uuid: user.uuid, role: USER_ROLE.NONE });
		});
	}

	/**
	 * 현재 phase와 바뀔 phase가 매칭되는지 확인하는 메서드입니다.
	 * @param roomUUID room UUID
	 * @param phase 바뀔 phase
	 * @returns boolean
	 */
	async validateRoomPhaseUpdate({ roomUUID, phase }: { roomUUID: string; phase: string }) {
		const room = await this.roomRepository.getRoom(roomUUID);
		const currentPhase = room.phase;
		if (currentPhase === ROOM_PHASE.LOBBY && phase === ROOM_PHASE.INTERVIEW) return true;
		if (currentPhase === ROOM_PHASE.INTERVIEW && phase === ROOM_PHASE.FEEDBACK) return true;
		if (currentPhase === ROOM_PHASE.FEEDBACK && phase === ROOM_PHASE.LOBBY) return true;

		throw new WsException(EXCEPTION_MESSAGE.INVALID_CHANGE_PHASE);
	}
}
