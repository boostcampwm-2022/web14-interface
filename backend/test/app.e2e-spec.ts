import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import cookieParser from 'cookie-parser';
import { OAUTH_CALLBACK_URL, OAUTH_TYPE } from '@constant';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { OauthNaverService } from 'src/auth/service/oauth/naver-oauth.service';
import { typeormConfig } from '@config';

const authService = () => ({});

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	const naverClientId = process.env.NAVER_CLIENT_ID;
	const naverCallbackUrl = [
		process.env.SERVER_ORIGIN_URL,
		OAUTH_CALLBACK_URL,
		OAUTH_TYPE.NAVER,
	].join('/');
	const kakaoClientId = process.env.KAKAO_CLIENT_ID;
	const kakaoCallbackUrl = [
		process.env.SERVER_ORIGIN_URL,
		OAUTH_CALLBACK_URL,
		OAUTH_TYPE.KAKAO,
	].join('/');

	const oauthNaverService = {
		getSocialUrl: () => 'test',
		getAccessTokenByAuthorizationCode: (authorizationCode) => 'test',
		getSocialInfoByAccessToken: (accessToken) => ({ id: 'test', oauthInfo: 'naver' }),
	};

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, TypeOrmModule.forRootAsync(typeormConfig)],
		})
			.overrideProvider(OauthNaverService)
			.useValue(oauthNaverService)
			.compile();

		app = moduleFixture.createNestApplication();
		app.setGlobalPrefix('api');
		app.use(cookieParser());
		await app.init();
	});

	describe('/api/auth/oauth/redirect/:type (GET)', () => {
		it('type: naver', () => {
			const pageUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naverCallbackUrl}`;

			return request(app.getHttpServer()).get('/api/auth/oauth/redirect/naver').expect(302);
			// .expect('Location', pageUrl);
		});
		it('type: kakao', () => {
			const pageUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoCallbackUrl}`;

			return request(app.getHttpServer()).get('/api/auth/oauth/redirect/kakao').expect(302);
			// .expect('Location', pageUrl);
		});
	});
	describe('/api/auth/oauth/callback/:type (GET)', () => {
		it('취소 누른 경우', async () => {
			return await request(app.getHttpServer())
				.get('/api/auth/oauth/callback/naver?code=')
				.expect(500);
		});

		it('social start', async () => {
			return await request(app.getHttpServer())
				.get('/api/auth/oauth/callback/naver?code=test')
				.expect(200);
		});
	});

	// it('/api/auth/login (GET)', () => {
	// 	return request(app.getHttpServer()).get('/api/auth/login').expect(200);
	// });

	afterAll(async () => {
		await app.close();
	});
});
