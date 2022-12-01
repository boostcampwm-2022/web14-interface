import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { ClassProvider, Module } from '@nestjs/common';
import { InmemoryRoomRepository } from './repository/inmemory-room.repository';
import { RoomGateway } from './room.gateway';
import { ConnectionService } from './service/connection/connection.service';
import { InterviewService } from './service/interview/interview.service';

export const RoomRepository: ClassProvider = {
	provide: ROOM_REPOSITORY_INTERFACE,
	useClass: InmemoryRoomRepository,
};

@Module({
	providers: [RoomGateway, RoomRepository, ConnectionService, InterviewService],
})
export class RoomModule {}
