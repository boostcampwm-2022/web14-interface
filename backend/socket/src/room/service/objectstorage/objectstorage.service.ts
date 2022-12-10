import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS, { S3 } from 'aws-sdk';
import { EVENT, NAVER_API_KEY, NAVER_API_PWD, ROOM_REPOSITORY_INTERFACE } from '@constant';
import { Socket } from 'socket.io';
import { clientId } from '@types';
import { RoomRepository } from 'src/room/repository/room.repository';
import {
	AWS_S3_RESION,
	BUCKET_CORS_ALLOW_SEC,
	BUCKET_NAME,
	MAX_VIDEO_COUNT,
	OBJECT_STORAGE_ENDPOINT,
} from 'src/constant/object-storage.constant';

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

	private endpoint = new AWS.Endpoint(OBJECT_STORAGE_ENDPOINT);
	private region = AWS_S3_RESION;
	private bucketName = BUCKET_NAME;
	private ApiAccessKey = this.configService.get(NAVER_API_KEY);
	private ApiSecretKey = this.configService.get(NAVER_API_PWD);
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

	deleteVideoMemoryData(clientId: string) {
		this.clientPacketMap.delete(clientId);
	}

	async uploadVideo({ client, docsUUID }: { client: Socket; docsUUID: string }) {
		const folderName = client.data.userId;
		const fileName = folderName + docsUUID;
		const videoBuffer = this.getVideoBuffer(client.id);
		this.deleteVideoMemoryData(client.id);

		await this.S3.putObject({
			Bucket: this.bucketName,
			Key: folderName,
		}).promise();

		this.S3.putObject(
			{
				Bucket: this.bucketName,
				Key: fileName,
				ACL: 'public-read',
				Body: videoBuffer,
				ContentType: 'video/webm',
			},
			async () => {
				this.handleMaxVideoCountByUser(client);
				const user = await this.roomRepository.getUserByClientId(client.id);
				const videoUrl = [this.bucketName, this.bucketName, fileName].join('/');

				client.to(user.roomUUID).emit(EVENT.DOWNLOAD_VIDEO, { videoUrl });
			}
		);

		return {};
	}

	async handleMaxVideoCountByUser(client: Socket) {
		const videoList = await this.getUserVideoList(client.data.userId);
		if (videoList.length > MAX_VIDEO_COUNT) {
			const overs = videoList
				.sort((a, b) => a.LastModified.getTime() - b.LastModified.getTime())
				.filter((_, idx) => idx >= MAX_VIDEO_COUNT);

			Promise.all(
				overs.map((video) => {
					const params: S3.Types.DeleteObjectRequest = {
						Bucket: this.bucketName,
						Key: video.Key,
					};
					this.S3.deleteObject(params).promise();
				})
			);
		}
	}

	async getUserVideoList(userId: string) {
		const params: S3.Types.ListObjectsV2Request = {
			Bucket: this.bucketName,
			MaxKeys: 100,
			Prefix: `${userId}/`,
		};

		const res = await this.S3.listObjectsV2(params).promise();
		return res.Contents.slice(1); // index 0 is folder
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
