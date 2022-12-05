import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import {
	AWS_S3_RESION,
	NAVER_API_KEY,
	NAVER_API_PWD,
	NAVER_OBJECT_STORAGE_ENDPOINT,
} from '@constant';

@Injectable()
export class ObjectStorageService {
	constructor(private readonly configService: ConfigService) {}

	private endpoint = new AWS.Endpoint(this.configService.get(NAVER_OBJECT_STORAGE_ENDPOINT));
	private region = this.configService.get(AWS_S3_RESION);
	private access_key = this.configService.get(NAVER_API_KEY);
	private secret_key = this.configService.get(NAVER_API_PWD);
}
