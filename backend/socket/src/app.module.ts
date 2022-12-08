import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '@config';
import { RoomModule } from './room/room.module';

@Module({
	imports: [ConfigModule.forRoot(envConfig), RoomModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
