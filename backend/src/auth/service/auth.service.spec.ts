import { JWT_ENV, USER_REPOSITORY_INTERFACE } from '@constant';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JoinUserBuilder } from '@builder';
import { UserInfo, MockRepository } from '@types';
import { TypeormUserEntity } from 'src/user/entities/typeorm-user.entity';
import { UserRepository } from 'src/user/repository/interface-user.repository';
import { AuthService } from './auth.service';
import { OauthKakaoService } from './oauth/kakao-oauth.service';
import { OauthNaverService } from './oauth/naver-oauth.service';

const mockUserRepository = () => ({
	saveUser: jest.fn(),
	findUserById: jest.fn(),
	findAllUser: jest.fn(),
});

const mockJwtService = () => ({
	sign: jest.fn(() => 'TOKEN'),
});

describe('AuthService', () => {
	let authService: AuthService;
	let userRepository: MockRepository<UserRepository>;
	let oauthGoogleService: OauthKakaoService;
	let oauthNaverService: OauthNaverService;
	let jwtService: JwtService;
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: USER_REPOSITORY_INTERFACE,
					useValue: mockUserRepository(),
				},
				OauthKakaoService,
				OauthNaverService,
				{
					provide: JwtService,
					useValue: mockJwtService(),
				},
				ConfigService,
			],
		}).compile();

		authService = module.get(AuthService);
		userRepository = module.get(USER_REPOSITORY_INTERFACE);
		oauthNaverService = module.get(OauthNaverService);
		oauthGoogleService = module.get(OauthKakaoService);
		jwtService = module.get(JwtService);
		configService = module.get(ConfigService);
	});

	describe('valid case', () => {
		it('의존성 주입 테스트', () => {
			expect(authService).toBeDefined();
			expect(userRepository).toBeDefined();
			expect(oauthNaverService).toBeDefined();
			expect(oauthGoogleService).toBeDefined();
			expect(jwtService).toBeDefined();
			expect(configService).toBeDefined();
		});

		it('유저의 OAuth로 시작 테스트', async () => {
			const user = makeMockUser({ id: 'testId', oauthType: 'naver' } as UserInfo);

			jest.spyOn(oauthNaverService, 'getAccessTokenByAuthorizationCode').mockResolvedValue(
				'success'
			);
			jest.spyOn(oauthNaverService, 'getSocialInfoByAccessToken').mockResolvedValue(user);
			jest.spyOn(userRepository, 'saveUser').mockResolvedValue(user);

			const joinedUser = await authService.socialStart({
				type: 'naver',
				authorizationCode: 'test',
			});

			expect(user).toEqual(joinedUser);
		});
	});

	describe('error case', () => {
		it('유저의 OAuth 승인 취소 테스트', async () => {
			try {
				await authService.socialStart({ type: 'naver', authorizationCode: undefined });
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('social 인증이 되지 않았습니다.');
			}
		});

		it('옳바른 OAuth타입이 아닐 때의 오류 테스트', async () => {
			try {
				await authService.socialStart({ type: 'invalid', authorizationCode: 'authCode' });
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('');
			}
		});
	});

	describe('token 발급 테스트', () => {
		it('access token 발급 테스트', () => {
			const payload = { id: 'test', nickname: 'test', email: 'test@test.com' };

			const token = authService.createJwt({
				payload,
				secret: JWT_ENV.JWT_ACCESS_TOKEN_SECRET,
				expirationTime: JWT_ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
			});

			expect(jwtService.sign).toHaveBeenCalledTimes(1);
			expect(jwtService.sign).toHaveBeenCalledWith(payload, {
				secret: process.env[JWT_ENV.JWT_ACCESS_TOKEN_SECRET],
				expiresIn: `${process.env[JWT_ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME]}s`,
			});
			expect(token).toBe('TOKEN');
		});

		it('refresh token 발급 테스트', () => {
			const payload = { id: 'test', nickname: 'test', email: 'test@test.com' };

			const token = authService.createJwt({
				payload,
				secret: JWT_ENV.JWT_REFRESH_TOKEN_SECRET,
				expirationTime: JWT_ENV.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
			});

			expect(jwtService.sign).toHaveBeenCalledTimes(1);
			expect(jwtService.sign).toHaveBeenCalledWith(payload, {
				secret: process.env[JWT_ENV.JWT_REFRESH_TOKEN_SECRET],
				expiresIn: `${process.env[JWT_ENV.JWT_REFRESH_TOKEN_EXPIRATION_TIME]}s`,
			});
			expect(token).toBe('TOKEN');
		});
	});

	const makeMockUser = (userInfo: UserInfo): TypeormUserEntity => {
		const { id, email, password, nickname, oauthType } = userInfo;
		const userEntity = new JoinUserBuilder()
			.setId(id)
			.setEmail(email)
			.setPassword(password)
			.setNickname(nickname)
			.setOauthType(oauthType)
			.setDefaultValue()
			.build();
		return userEntity;
	};
});
