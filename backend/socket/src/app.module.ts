import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';

@Module({
	imports: [RoomModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
