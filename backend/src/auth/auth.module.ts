import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeormUserRepository } from 'src/user/repository/typeorm-user.repository';
import { USER_REPOSITORY_INTERFACE } from '@constant';
import { UserModule } from 'src/user/user.module';
import { OauthGoogleService } from './service/oauth/google-oauth.service';
import { OauthNaverService } from './service/oauth/naver-oauth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const userRepository: ClassProvider = {
	provide: USER_REPOSITORY_INTERFACE,
	useClass: TypeormUserRepository,
};

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [AuthService, userRepository, OauthGoogleService, OauthNaverService, JwtService, ConfigService],
})
export class AuthModule {}
