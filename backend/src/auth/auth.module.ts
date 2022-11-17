import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeormUserRepository } from 'src/user/repository/typeorm-user.repository';
import { USER_REPOSITORY_INTERFACE } from '@constant';
import { UserModule } from 'src/user/user.module';
import { OauthNaverService } from './service/oauth/naver-oauth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthKakaoService } from './service/oauth/kakao-oauth.service';

export const UserRepository: ClassProvider = {
	provide: USER_REPOSITORY_INTERFACE,
	useClass: TypeormUserRepository,
};

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([TypeormUserRepository])],
	controllers: [AuthController],
	providers: [AuthService, UserRepository, OauthKakaoService, OauthNaverService],
})
export class AuthModule {}
