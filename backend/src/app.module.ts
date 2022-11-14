import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, typeormConfig } from '@config';

@Module({
	imports: [ConfigModule.forRoot(envConfig), TypeOrmModule.forRootAsync(typeormConfig)],
	controllers: [],
	providers: [],
})
export class AppModule {}
