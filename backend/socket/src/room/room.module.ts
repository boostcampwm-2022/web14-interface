import { ROOM_REPOSITORY_INTERFACE } from '@constant';
import { ClassProvider, Module } from '@nestjs/common';
import { RedisRoomRepository } from './repository/redis-room.repository';
import { RoomGateway } from './room.gateway';
import { ChatService } from './service/chat/chat.service';
import { ConnectionService } from './service/connection/connection.service';
import { InterviewService } from './service/interview/interview.service';
import { ObjectStorageService } from './service/objectstorage/objectstorage.service';
import { WebrtcService } from './service/webRTC/webrtc.service';

export const RoomRepository: ClassProvider = {
	provide: ROOM_REPOSITORY_INTERFACE,
	useClass: RedisRoomRepository,
};

@Module({
	providers: [
		RoomGateway,
		RoomRepository,
		ConnectionService,
		InterviewService,
		ChatService,
		WebrtcService,
		ObjectStorageService,
	],
})
export class RoomModule {}
