import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
	isGlobal: true, // 환경 변수를 전역으로 사용
	envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env.test',
	// 루트 경로에서 .env 사용 (cross-env로 환경에 따른 .env 적용도 가능)
	// public에 올리면 env 파일의 변수 목록이 공개되어 안 좋지 않을까..
	validationSchema: Joi.object({
		DB_USER: Joi.string().required(),
		DB_PASSWORD: Joi.string().required(),
		DB_NAME: Joi.string().required(),

		JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
		JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),

		NAVER_CLIENT_SECRET: Joi.string().required(),
		KAKAO_CLIENT_SECRET: Joi.string().required(),
		CLIENT_ORIGIN_URL: Joi.string().required(),

		SWAGGER_USER: Joi.string().required(),
		SWAGGER_PASSWORD: Joi.string().required(),
	}),
};
