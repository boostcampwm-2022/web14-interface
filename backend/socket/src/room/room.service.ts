import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { repositoryType } from 'src/types/room.type';
import { v4 as uuidv4 } from 'uuid';
import { InmemoryRoomRepository } from './repository/inmemory-room.repository';

@Injectable()
export class RoomService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository<repositoryType>
	) {}

	createRoom() {
		const uuid = uuidv4();

		this.roomRepository.createRoom(uuid);

		return uuid;
	}
}
