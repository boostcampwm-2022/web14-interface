import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS, { S3 } from 'aws-sdk';
import {
	AWS_S3_RESION,
	BUCKET_CORS_ALLOW_SEC,
	BUCKET_NAME,
	NAVER_API_KEY,
	NAVER_API_PWD,
	NAVER_OBJECT_STORAGE_ENDPOINT,
} from '@constant';
import fs from 'fs';
import { Socket } from 'socket.io';
import { clientId } from '@types';
import { VideoBlobDto } from 'src/room/dto/video.dto';

@Injectable()
export class ObjectStorageService {
	constructor(private readonly configService: ConfigService) {
		this.S3 = new AWS.S3({
			endpoint: this.endpoint,
			region: this.region,
			credentials: {
				accessKeyId: this.ApiAccessKey,
				secretAccessKey: this.ApiSecretKey,
			},
		});
	}

	private clientPacketMap = new Map<clientId, VideoBlobDto[]>();

	private endpoint = new AWS.Endpoint(this.configService.get(NAVER_OBJECT_STORAGE_ENDPOINT));
	private region = this.configService.get(AWS_S3_RESION);
	private ApiAccessKey = this.configService.get(NAVER_API_KEY);
	private ApiSecretKey = this.configService.get(NAVER_API_PWD);
	private bucketName = this.configService.get(BUCKET_NAME);
	private S3: AWS.S3;

	mediaStreaming({ client, packet }: { client: Socket; packet: VideoBlobDto }) {
		if (!this.clientPacketMap.get(client.id)) {
			this.clientPacketMap.set(client.id, []);
		}

		const packets = this.clientPacketMap.get(client.id);
		packets.push(packet);
	}

	createLocalPathFromBlobs(clientId: string) {
		const packets = this.clientPacketMap.get(clientId);
		packets.sort((a, b) => a.timestamp - b.timestamp);
		const videoBlob = new Blob(packets.map((packet) => packet.data));

		this.clientPacketMap.delete(clientId);

		return URL.createObjectURL(videoBlob);
	}

	async uploadVideo({ client, docsUUID }: { client: Socket; docsUUID: string }) {
		const polderName = 'userId/'; // TODO: user id로 폴더 생성
		const fileName = docsUUID;
		const localPath = this.createLocalPathFromBlobs(client.id);

		await this.S3.putObject({
			Bucket: this.bucketName,
			Key: polderName,
		}).promise();

		await this.S3.putObject({
			Bucket: this.bucketName,
			Key: fileName,
			ACL: 'public-read',
			Body: fs.createReadStream(localPath),
		}).promise();
	}

	async;

	async setCorsAtBucket() {
		const params: S3.Types.PutBucketCorsRequest = {
			Bucket: this.bucketName,
			CORSConfiguration: {
				CORSRules: [
					{
						AllowedHeaders: ['*'],
						AllowedMethods: ['GET', 'PUT'],
						AllowedOrigins: ['*'],
						MaxAgeSeconds: BUCKET_CORS_ALLOW_SEC,
					},
				],
			},
		};

		await this.S3.putBucketCors(params).promise();

		return {};
	}
}
