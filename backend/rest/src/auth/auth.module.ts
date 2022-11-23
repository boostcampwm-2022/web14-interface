import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { USER_REPOSITORY_INTERFACE } from '@constant';
import { UserModule } from '../user/user.module';
import { OauthNaverService } from './service/oauth/naver-oauth.service';
import { OauthKakaoService } from './service/oauth/kakao-oauth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategy/access-jwt.strategy';
import { JwtRefreshStrategy } from './strategy/refresh-jwt.strategy';
import { TypeormUserRepository } from '../user/repository/typeorm-user.repository';

export const UserRepository: ClassProvider = {
	provide: USER_REPOSITORY_INTERFACE,
	useClass: TypeormUserRepository,
};

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserRepository,
		OauthKakaoService,
		OauthNaverService,
		JwtService,
		ConfigService,
		JwtAccessStrategy,
		JwtRefreshStrategy,
	],
})
export class AuthModule {}
