import { ROOM_PHASE, ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '@types';
import { RoomRepository } from 'src/room/repository/room.repository';
import { ConnectionService } from './connection.service';

const roomUUID = 'testRoomUUID';

const mockRoomRepository = () => ({
	createRoom: jest.fn(() => {
		return {
			roomUUID: roomUUID,
			phase: ROOM_PHASE.LOBBY,
		};
	}),
});

describe('ConnectionService', () => {
	let connectionService: ConnectionService;
	let roomRepository: MockRepository<RoomRepository>;

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

		expect(uuid).toBe(roomUUID);
	});
});
