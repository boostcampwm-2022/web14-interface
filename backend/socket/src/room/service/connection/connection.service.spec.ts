import { ROOM_PHASE, ROOM_REPOSITORY_INTERFACE, SOCKET_MESSAGE } from '@constant';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository, authId, clientId, Room, roomUUID, User, userUUID } from '@types';
import { RoomRepository } from 'src/room/repository/room.repository';
import { ConnectionService } from './connection.service';
import MockedSocket from 'socket.io-mock';
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

describe('ConnectionService', () => {
	let connectionService: ConnectionService;
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
				{
					provide: ROOM_REPOSITORY_INTERFACE,
					useValue: mockRoomRepository(),
				},
			],
		}).compile();

		connectionService = module.get<ConnectionService>(ConnectionService);
		roomRepository = module.get(ROOM_REPOSITORY_INTERFACE);
	});

	it('should be defined', () => {
		expect(connectionService).toBeDefined();
		expect(roomRepository).toBeDefined();
	});

	describe('방 만들기 테스트', () => {
		it('기본 방 만들기', async () => {
			const { data } = await connectionService.createRoom();
			const { uuid } = data;

			expect(uuid).toBe(testRoomUUID);
		});
	});

	describe('방 참가 테스트', () => {
		it('없는 방에 참가', async () => {
			const socket = new MockedSocket();
			socket.data = { authId: 'testAuthId' };

			const result = await connectionService.enterRoom({
				roomUUID: 'unknownUUID',
				client: socket,
			});

			if (!('success' in result)) {
				throw new InternalServerErrorException();
			}
			if (result.success) {
				throw new InternalServerErrorException();
			}
			const { message } = result;
			expect(message).toBe(SOCKET_MESSAGE.NO_ROOM);
		});

		it('같은 계정으로 중복 참가', async () => {
			const socket = new MockedSocket();
			socket.to = function (uuid) {
				return this;
			};
			socket.data = { authId: 'testAuthId' };

			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: socket,
			});

			const result = await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: socket,
			});

			if (!('success' in result)) {
				throw new InternalServerErrorException();
			}
			if (result.success) {
				throw new InternalServerErrorException();
			}
			const { message } = result;
			expect(message).toBe(SOCKET_MESSAGE.EXIST_SAME_AUTH_ID);
		});

		it('인터뷰가 진행중일 때 참가', async () => {
			const socket = new MockedSocket();
			socket.data = { authId: 'testAuthId' };

			const result = await connectionService.enterRoom({
				roomUUID: testBusyRoomUUID,
				client: socket,
			});

			if (!('success' in result)) {
				throw new InternalServerErrorException();
			}
			if (result.success) {
				throw new InternalServerErrorException();
			}
			const { message } = result;
			expect(message).toBe(SOCKET_MESSAGE.BUSY_ROOM);
		});

		it('참가 허용 인원 초과', async () => {
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
			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[3],
			});
			const result = await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[4],
			});

			if (!('success' in result)) {
				throw new InternalServerErrorException();
			}
			if (result.success) {
				throw new InternalServerErrorException();
			}
			const { message } = result;
			expect(message).toBe(SOCKET_MESSAGE.FULL_ROOM);
		});
	});

	describe('방 떠나기', () => {
		it('모든 유저가 방을 떠났을 때 방 삭제', async () => {
			await connectionService.enterRoom({
				roomUUID: testRoomUUID,
				client: sockets[0],
			});

			expect(rooms.get(testRoomUUID)).toBeDefined();

			await connectionService.leaveRoom(sockets[0]);

			expect(rooms.get(testRoomUUID)).toBeUndefined();
		});
	});
});
