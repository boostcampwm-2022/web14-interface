import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { ClassProvider, Module } from '@nestjs/common';
import { InmemoryRoomRepository } from './repository/inmemory-room.repository';
import { RoomGateway } from './room.gateway';
import { RoomService } from './service/connection.service';

export const RoomRepository: ClassProvider = {
	provide: ROOM_REPOSITORY_INTERFACE,
	useClass: InmemoryRoomRepository,
};

@Module({
	providers: [RoomService, RoomGateway, RoomRepository],
})
export class RoomModule {}
