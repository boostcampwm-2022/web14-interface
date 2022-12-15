import { ROOM_PHASE, ROOM_REPOSITORY_INTERFACE, SOCKET_MESSAGE, USER_ROLE } from '@constant';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository, authId, clientId, Room, roomUUID, User, userUUID } from '@types';
import { RoomRepository } from 'src/room/repository/room.repository';
import MockedSocket from 'socket.io-mock';
import { InterviewService } from './interview.service';
import { ConnectionService } from '../connection/connection.service';
import { InternalServerErrorException } from '@nestjs/common';

const testRoomUUID = 'testRoomUUID';
const testBusyRoomUUID = 'testBusyRoomUUID';

let rooms;
let usersInRoom;
let clientUserIdMap;
let authIdUserIdMap;
let userMap;

const mockRoomRepository = () => ({
	createRoom: jest.fn(({ roomUUID, room }) => {
		rooms.set(testRoomUUID, { roomUUID: testRoomUUID, phase: ROOM_PHASE.LOBBY });
		usersInRoom.set(testRoomUUID, new Set());
		return { roomUUID: testRoomUUID, phase: ROOM_PHASE.LOBBY };
	}),

	getRoom: jest.fn((roomUUID) => {
		return rooms.get(roomUUID);
	}),

	getUserIdByAuthId: jest.fn((authId) => {
		return authIdUserIdMap.get(authId);
	}),

	getUsersInRoom: jest.fn((roomUUID) => {
		const userSet = usersInRoom.get(roomUUID);
		if (!userSet) return [];

		return [...userSet].map((uuid) => userMap.get(uuid));
	}),

	saveUserInRoom: jest.fn((user) => {
		const userSet = usersInRoom.get(user.roomUUID);
		userSet.add(user.uuid);

		userMap.set(user.uuid, user);
		authIdUserIdMap.set(user.authId, user.uuid);
		clientUserIdMap.set(user.clientId, user.uuid);
	}),

	getUserByClientId: jest.fn((clientId) => {
		const uuid = clientUserIdMap.get(clientId);
		return userMap.get(uuid);
	}),

	removeUser: jest.fn((user) => {
		const userSet = usersInRoom.get(user.roomUUID);
		userSet.delete(user.uuid);

		// cascading
		userMap.delete(user.uuid);
		clientUserIdMap.delete(user.clientId);
		authIdUserIdMap.delete(user.authId);
	}),

	deleteRoom: jest.fn((roomUUID) => {
		rooms.delete(roomUUID);
		usersInRoom.delete(roomUUID);
	}),

	updateRoomPhase: jest.fn(({ roomUUID, phase }) => {
		const room = rooms.get(roomUUID);
		room.phase = phase;
	}),

	updateUserInfo: jest.fn(({ uuid, updateUser }) => {
		const user = userMap.get(uuid);
		for (const key in updateUser) {
			user[key] = updateUser[key];
		}
		userMap.set(user.uuid, user);

		return userMap.get(user.uuid);
	}),
});

const createMockSockets = (count) => {
	const sockets = [];
	for (let i = 0; i < count; i++) {
		const socket = new MockedSocket();
		socket.data = { authId: `testAuthId${i}` };
		socket.to = function (uuid) {
			return this;
		};
		socket.id = `testClientId${i}`;

		sockets.push(socket);
	}

	return sockets;
};

describe('InterviewService', () => {
	let connectionService: ConnectionService;
	let interviewService: InterviewService;
	let roomRepository: MockRepository<RoomRepository>;
	let sockets;

	beforeAll(() => {
		sockets = createMockSockets(5);
	});

	beforeEach(async () => {
		rooms = new Map<roomUUID, Room>();
		usersInRoom = new Map<roomUUID, Set<userUUID>>();
		clientUserIdMap = new Map<clientId, userUUID>();
		authIdUserIdMap = new Map<authId, userUUID>();
		userMap = new Map<userUUID, User>();

		rooms.set(testRoomUUID, { roomUUID: testRoomUUID, phase: ROOM_PHASE.LOBBY });
		usersInRoom.set(testRoomUUID, new Set());

		rooms.set(testBusyRoomUUID, { roomUUID: testBusyRoomUUID, phase: ROOM_PHASE.INTERVIEW });
		usersInRoom.set(testBusyRoomUUID, new Set());

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ConnectionService,
				InterviewService,
				{
					provide: ROOM_REPOSITORY_INTERFACE,
					useValue: mockRoomRepository(),
				},
			],
		}).compile();

		connectionService = module.get<ConnectionService>(ConnectionService);
		interviewService = module.get<InterviewService>(InterviewService);
		roomRepository = module.get(ROOM_REPOSITORY_INTERFACE);
	});

	it('should be defined', () => {
		expect(connectionService).toBeDefined();
		expect(roomRepository).toBeDefined();
	});

	describe('인터뷰 시작', () => {
		it('면접 시작 인원이 충분하지 않음', async () => {
			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[0],
			});

			const result = await interviewService.startInterview(sockets[0]);

			if (!('success' in result)) {
				throw new InternalServerErrorException();
			}
			if (result.success) {
				throw new InternalServerErrorException();
			}
			const { message } = result;
			expect(message).toBe(SOCKET_MESSAGE.NOT_ENOUGHT_USER);
		});

		it('면접 시작시 room phase, user role 업데이트', async () => {
			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[0],
			});

			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[1],
			});

			await interviewService.startInterview(sockets[0]);

			expect(rooms.get(testRoomUUID).phase).toBe(ROOM_PHASE.INTERVIEW);

			const userSet = usersInRoom.get(testRoomUUID);
			const users = [...userSet].map((userUUID) => userMap.get(userUUID));
			expect(users[0].role).toBe(USER_ROLE.INTERVIEWEE);
			expect(users[1].role).toBe(USER_ROLE.INTERVIEWER);
		});
	});

	describe('면접 종료', () => {
		it('면접 종료 시 room phase 업데이트', async () => {
			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[0],
			});

			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[1],
			});

			await interviewService.startInterview(sockets[0]);

			await interviewService.endInterview({ client: sockets[0], server: sockets[0] });

			expect(rooms.get(testRoomUUID).phase).toBe(ROOM_PHASE.FEEDBACK);
		});
	});

	describe('피드백 종료', () => {
		it('모든 면접관이 피드백을 마침', async () => {
			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[0],
			});

			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[1],
			});

			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[2],
			});

			await interviewService.startInterview(sockets[0]);

			await interviewService.endInterview({ client: sockets[0], server: sockets[0] });

			const inProgressCycle = await interviewService.endFeedback({
				client: sockets[1],
				server: sockets[1],
			});
			const terminateCycle = await interviewService.endFeedback({
				client: sockets[2],
				server: sockets[2],
			});

			expect(rooms.get(testRoomUUID).phase).toBe(ROOM_PHASE.LOBBY);
			const userSet = usersInRoom.get(testRoomUUID);
			const users = [...userSet].map((userUUID) => userMap.get(userUUID));
			expect(users[1].role).toBe(USER_ROLE.NONE);
			expect(users[2].role).toBe(USER_ROLE.NONE);

			expect(inProgressCycle.data.isLastFeedback).toBe(false);
			expect(terminateCycle.data.isLastFeedback).toBe(true);
		});
	});
});
