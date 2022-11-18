import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthModule } from './../src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig, typeormConfig } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../src/user/user.module';
import { AuthService } from './../src/auth/service/auth.service';
import { NestFactory } from '@nestjs/core';

describe('AppController (e2e)', () => {
	let app: INestApplication;
	const authService = { getSocialUrl: () => 'test' };

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule,
				// AuthModule,
				// ConfigModule.forRoot(envConfig),
				// TypeOrmModule.forRootAsync(typeormConfig),
				// UserModule,
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/api/auth/oauth/redirect/:type (GET)', () => {
		return request(app.getHttpServer()).get('/api/auth/oauth/redirect/naver').expect(301);
	});
	it('/api/auth/oauth/callback/:type (GET)', async () => {
		return await request(app.getHttpServer())
			.get('/api/auth/oauth/callback/naver?code=test')
			.expect(200);
	});

	it('/api/auth/login (GET)', () => {
		return request(app.getHttpServer()).get('/api/auth/login').expect(200);
	});

	afterAll(async () => {
		await app.close();
	});
});
