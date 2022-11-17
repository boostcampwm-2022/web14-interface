import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeormUserRepository } from 'src/user/repository/typeorm-user.repository';
import { USER_REPOSITORY_INTERFACE } from '@constant';
import { UserModule } from 'src/user/user.module';
import { OauthNaverService } from './service/oauth/naver-oauth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthKakaoService } from './service/oauth/kakao-oauth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategy/access-jwt.strategy';
import { JwtRefreshStrategy } from './strategy/refresh-jwt.strategy';

export const UserRepository: ClassProvider = {
	provide: USER_REPOSITORY_INTERFACE,
	useClass: TypeormUserRepository,
};

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([TypeormUserRepository])],
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
