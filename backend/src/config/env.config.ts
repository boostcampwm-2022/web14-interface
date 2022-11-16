import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
	isGlobal: true, // 환경 변수를 전역으로 사용
	envFilePath: '.env',
	// 루트 경로에서 .env 사용 (cross-env로 환경에 따른 .env 적용도 가능)
	validationSchema: Joi.object({
		DB_USER: Joi.string().required(),
		DB_PASSWORD: Joi.string().required(),
		DB_NAME: Joi.string().required(),
		JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
		JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
		JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
		JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
	})
};
