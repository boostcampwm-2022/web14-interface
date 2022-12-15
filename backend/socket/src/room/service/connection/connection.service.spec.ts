import { ROOM_PHASE, ROOM_REPOSITORY_INTERFACE, SOCKET_MESSAGE } from '@constant';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository, authId, clientId, Room, roomUUID, User, userUUID } from '@types';
import { RoomRepository } from 'src/room/repository/room.repository';
import { ConnectionService } from './connection.service';
import MockedSocket from 'socket.io-mock';
import { InternalServerErrorException } from '@nestjs/common';

const sockets = [];

const testRoomUUID = 'testRoomUUID';

const rooms = new Map<roomUUID, Room>();
const usersInRoom = new Map<roomUUID, Set<userUUID>>();
const clientUserIdMap = new Map<clientId, userUUID>();
const authIdUserIdMap = new Map<authId, userUUID>();
const userMap = new Map<userUUID, User>();

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
});

describe('ConnectionService', () => {
	let connectionService: ConnectionService;
	let roomRepository: MockRepository<RoomRepository>;

	beforeAll(() => {
		rooms.set(testRoomUUID, { roomUUID: testRoomUUID, phase: ROOM_PHASE.LOBBY });
		usersInRoom.set(testRoomUUID, new Set());
	});

	beforeEach(async () => {
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

	it('방 만들기 테스트', async () => {
		const { data } = await connectionService.createRoom();
		const { uuid } = data;

		expect(uuid).toBe(testRoomUUID);
	});

	describe('방 참가 테스트', () => {
		it('없는 방에 참가', async () => {
			const socket = new MockedSocket();
			socket.socketClient.data = { authId: 'testAuthId' };

			console.log(rooms.get(testRoomUUID));

			const result = await connectionService.enterRoom({
				roomUUID: 'unknownUUID',
				client: socket.socketClient,
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

			console.log(rooms.get(testRoomUUID));

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
	});
});
