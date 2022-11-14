import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';

@Module({
	imports: [ConfigModule.forRoot(envConfig)],
	controllers: [],
	providers: [],
})
export class AppModule {}
