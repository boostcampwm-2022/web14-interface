import { JoinUserBuilder } from '../../user/entities/typeorm-user.builder';
import {
	JWT_ACCESS_TOKEN_EXPIRATION_TIME,
	JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_EXPIRATION_TIME,
	JWT_REFRESH_TOKEN_SECRET,
	USER_REPOSITORY_INTERFACE,
} from '@constant';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserInfo } from 'src/types/auth.type';
import { MockRepository } from 'src/types/mock.type';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { AuthService } from './auth.service';
import { OauthKakaoService } from './oauth/kakao-oauth.service';
import { OauthNaverService } from './oauth/naver-oauth.service';

const mockUserRepository = () => ({
	saveUser: jest.fn(),
	findUserById: jest.fn(),
	findAllUser: jest.fn(),
});

const CONFIG_JWT_SECRET = 'test';
const CONFIG_JWT_EXPIRATION = '3600';

const mockConfigService = {
	get: jest.fn((key: string) => {
		switch (key) {
			case JWT_ACCESS_TOKEN_SECRET:
				return CONFIG_JWT_SECRET;
			case JWT_REFRESH_TOKEN_SECRET:
				return CONFIG_JWT_SECRET;
			default:
				return null;
		}
	}),
};

describe('AuthService', () => {
	let authService: AuthService;
	let userRepository: MockRepository<UserRepository<UserEntity>>;
	let oauthGoogleService: OauthKakaoService;
	let oauthNaverService: OauthNaverService;
	let jwtService: JwtService;

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
					provide: ConfigService,
					useValue: mockConfigService,
				},
				JwtService,
			],
		}).compile();

		authService = module.get(AuthService);
		userRepository = module.get(USER_REPOSITORY_INTERFACE);
		oauthNaverService = module.get(OauthNaverService);
		oauthGoogleService = module.get(OauthKakaoService);
		jwtService = module.get(JwtService);
	});

	describe('valid case', () => {
		it('의존성 주입 테스트', () => {
			expect(authService).toBeDefined();
			expect(userRepository).toBeDefined();
			expect(oauthNaverService).toBeDefined();
			expect(oauthGoogleService).toBeDefined();
			expect(jwtService).toBeDefined();
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

			const spyFn = jest.spyOn(jwtService, 'sign');
			authService.createJwt({
				payload,
				secret: JWT_ACCESS_TOKEN_SECRET,
				expirationTime: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
			});

			expect(spyFn).toHaveBeenCalledTimes(1);
			expect(spyFn).toHaveBeenCalledWith(payload, {
				secret: CONFIG_JWT_SECRET,
				expiresIn: `${CONFIG_JWT_EXPIRATION}s`,
			});
		});

		it('refresh token 발급 테스트', () => {
			const payload = { id: 'test', nickname: 'test', email: 'test@test.com' };

			const spyFn = jest.spyOn(jwtService, 'sign');
			authService.createJwt({
				payload,
				secret: JWT_REFRESH_TOKEN_SECRET,
				expirationTime: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
			});

			expect(spyFn).toHaveBeenCalledTimes(1);
			expect(spyFn).toHaveBeenCalledWith(payload, {
				secret: CONFIG_JWT_SECRET,
				expiresIn: `${CONFIG_JWT_EXPIRATION}s`,
			});
		});
	});

	const makeMockUser = (userInfo: UserInfo): UserEntity => {
		const { id, email, password, oauthType } = userInfo;
		const userEntity = new JoinUserBuilder()
			.setId(id)
			.setEmail(email)
			.setPassword(password)
			.setOauthType(oauthType)
			.build();
		return userEntity;
	};
});
