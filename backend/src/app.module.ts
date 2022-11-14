import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from './config/env.config';
import typeormConfig from './config/typeorm.config';

@Module({
	imports: [ConfigModule.forRoot(envConfig), TypeOrmModule.forRootAsync(typeormConfig)],
	controllers: [],
	providers: [],
})
export class AppModule {}
