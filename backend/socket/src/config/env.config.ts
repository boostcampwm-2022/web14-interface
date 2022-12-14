import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
	isGlobal: true,
	envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env.test',
	validationSchema: Joi.object({
		NAVER_API_KEY: Joi.string().required(),
		NAVER_API_PWD: Joi.string().required(),
		REST_SERVER_ORIGIN: Joi.string().required(),
	}),
};
