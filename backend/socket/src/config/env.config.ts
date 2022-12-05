import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
	isGlobal: true,
	envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env.test',
	validationSchema: Joi.object({
		NAVER_API_KEY: Joi.string().required(),
		NAVER_API_PWD: Joi.string().required(),
		NAVER_OBJECT_STORAGE_ENDPOINT: Joi.string().required(),
		AWS_S3_RESION: Joi.string().required(),
		BUCKET_NAME: Joi.string().required(),
	}),
};
