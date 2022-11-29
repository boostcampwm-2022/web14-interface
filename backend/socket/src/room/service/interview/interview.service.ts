import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Inject, Injectable } from '@nestjs/common';
import { RoomRepository } from 'src/room/repository/interface-room.repository';

@Injectable()
export class InterviewService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository
	) {}
}
