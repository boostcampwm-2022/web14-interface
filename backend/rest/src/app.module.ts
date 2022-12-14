import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, typeormConfig } from '@config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InterviewModule } from './interview/interview.module';

@Module({
	imports: [
		ConfigModule.forRoot(envConfig),
		TypeOrmModule.forRootAsync(typeormConfig),
		AuthModule,
		UserModule,
		InterviewModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
