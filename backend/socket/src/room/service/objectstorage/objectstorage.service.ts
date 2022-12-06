import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS, { S3 } from 'aws-sdk';
import {
	AWS_S3_RESION,
	BUCKET_CORS_ALLOW_SEC,
	BUCKET_NAME,
	EVENT,
	NAVER_API_KEY,
	NAVER_API_PWD,
	NAVER_OBJECT_STORAGE_ENDPOINT,
	ROOM_REPOSITORY_INTERFACE,
} from '@constant';
import { Socket } from 'socket.io';
import { clientId } from '@types';
import { RoomRepository } from 'src/room/repository/interface-room.repository';

@Injectable()
export class ObjectStorageService {
	constructor(
		@Inject(ROOM_REPOSITORY_INTERFACE)
		private readonly roomRepository: RoomRepository,
		private readonly configService: ConfigService
	) {
		this.S3 = new AWS.S3({
			endpoint: this.endpoint,
			region: this.region,
			credentials: {
				accessKeyId: this.ApiAccessKey,
				secretAccessKey: this.ApiSecretKey,
			},
		});
	}

	private clientPacketMap = new Map<clientId, Buffer[]>();

	private objectStorageUrl = this.configService.get(NAVER_OBJECT_STORAGE_ENDPOINT);
	private endpoint = new AWS.Endpoint(this.objectStorageUrl);
	private region = this.configService.get(AWS_S3_RESION);
	private ApiAccessKey = this.configService.get(NAVER_API_KEY);
	private ApiSecretKey = this.configService.get(NAVER_API_PWD);
	private bucketName = this.configService.get(BUCKET_NAME);
	private S3: AWS.S3;

	mediaStreaming({ client, videoBuffer }: { client: Socket; videoBuffer: Buffer }) {
		if (!this.clientPacketMap.get(client.id)) {
			this.clientPacketMap.set(client.id, []);
		}

		const buffers = this.clientPacketMap.get(client.id);
		buffers.push(videoBuffer);

		return {};
	}

	getVideoBuffer(clientId: string): Buffer {
		const buffers = this.clientPacketMap.get(clientId);
		return Buffer.concat(buffers);
	}

	deleteVideoData(clientId: string) {
		this.clientPacketMap.delete(clientId);
	}

	async uploadVideo({ client, docsUUID }: { client: Socket; docsUUID: string }) {
		const folderName = 'userId/'; // TODO: user id로 폴더 생성
		const fileName = folderName + docsUUID;
		const videoBuffer = this.getVideoBuffer(client.id);

		await this.S3.putObject({
			Bucket: this.bucketName,
			Key: folderName,
		}).promise();

		await this.S3.putObject({
			Bucket: this.bucketName,
			Key: fileName,
			ACL: 'public-read',
			Body: videoBuffer,
			ContentType: 'video/webm',
		}).promise();

		this.deleteVideoData(client.id);
		const user = this.roomRepository.getUserByClientId(client.id);
		const videoUrl = [this.objectStorageUrl, this.bucketName, fileName].join('/');

		client.to(user.roomUUID).emit(EVENT.DOWNLOAD_VIDEO, { videoUrl });

		return {};
	}

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
