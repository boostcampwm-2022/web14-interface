import { USER_REPOSITORY_INTERFACE } from '@constant';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from 'src/types/mock.type';
import { JoinUserBuilder, UserEntity } from 'src/user/entities/typeorm-user.entity';
import { UserRepository } from 'src/user/repository/interface-user.repository';
import { AuthService } from './auth.service';
import { OauthGoogleService } from './oauth/google-oauth.service';
import { OauthNaverService } from './oauth/naver-oauth.service';

const mockUserRepository = () => ({
	saveUser: jest.fn(),
	findUserById: jest.fn(),
	findAllUser: jest.fn(),
});

describe('AuthService', () => {
	let authService: AuthService;
	let userRepository: MockRepository<UserRepository<UserEntity>>;
	let oauthGoogleService: OauthGoogleService;
	let oauthNaverService: OauthNaverService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: USER_REPOSITORY_INTERFACE,
					useValue: mockUserRepository(),
				},
				OauthGoogleService,
				OauthNaverService,
			],
		}).compile();

		authService = module.get(AuthService);
		userRepository = module.get(USER_REPOSITORY_INTERFACE);
		oauthNaverService = module.get(OauthNaverService);
		oauthGoogleService = module.get(OauthGoogleService);
	});

	it('의존성 주입 테스트', () => {
		expect(authService).toBeDefined();
		expect(userRepository).toBeDefined();
		expect(oauthNaverService).toBeDefined();
		expect(oauthGoogleService).toBeDefined();
	});
});
