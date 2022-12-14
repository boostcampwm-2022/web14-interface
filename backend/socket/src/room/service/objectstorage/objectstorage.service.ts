import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS, { S3 } from 'aws-sdk';
import {
	EVENT,
	NAVER_API_KEY,
	NAVER_API_PWD,
	ROOM_REPOSITORY_INTERFACE,
	AWS_S3_RESION,
	BUCKET_CORS_ALLOW_SEC,
	BUCKET_NAME,
	MAX_VIDEO_COUNT,
	OBJECT_STORAGE_ENDPOINT,
	SOCKET_MESSAGE,
	VIDEO_RUNNING_SEC_LIMIT,
} from '@constant';
import { Socket } from 'socket.io';
import { clientId } from '@types';
import { RoomRepository } from 'src/room/repository/room.repository';
import { deleteInterviewDocs } from 'util/rest-api.util';

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

	/**
	 * client가 보내는 video buffer를 받아서 저장하는 메서드입니다.
	 * client id를 key로 배열에 buffer로 저장됩니다.
	 * @params videoBuffer - client의 실시간 영상 stream가 buffer로 변환 된 후 전달
	 */
	mediaStreaming({ client, videoBuffer }: { client: Socket; videoBuffer: Buffer }) {
		if (!this.clientPacketMap.get(client.id)) {
			this.clientPacketMap.set(client.id, []);
		}

		const buffers = this.clientPacketMap.get(client.id);
		buffers.push(videoBuffer);

		return this.handleRunningTimeOver(client);
	}

	/**
	 * 1시간이 경과하면 false를 반환합니다.
	 * @returns
	 */
	handleRunningTimeOver(client: Socket) {
		const videoSize = this.clientPacketMap.get(client.id).length;

		return videoSize >= VIDEO_RUNNING_SEC_LIMIT
			? { success: false, message: SOCKET_MESSAGE.VIDEO_TIME_LIMIT_OVER }
			: {};
	}

	/**
	 * 저장된 buffer 배열을 하나의 buffer로 변환 후 반환하는 메서드입니다.
	 * @param clientId
	 * @returns
	 */
	getVideoBuffer(clientId: string): Buffer {
		const buffers = this.clientPacketMap.get(clientId);
		return Buffer.concat(buffers);
	}

	/**
	 * client id로 저장된 video buffer를 비웁니다.
	 * 영상이 저장될 때도 실행되며, 또한 client socket이 disconnect 될 때 실행됩니다.
	 * @param clientId
	 */
	deleteVideoMemoryData(clientId: string) {
		this.clientPacketMap.delete(clientId);
	}

	/**
	 * 해당 client가 전달한 실시간 영상을 ncloud object storage에 upload합니다.
	 * 영상의 제목(key)는 interview docs의 uuid입니다.
	 * @param docsUUID - 영상의 이름으로 쓰일 interview docs uuid
	 * @returns
	 */
	async uploadVideo({ client, docsUUID }: { client: Socket; docsUUID: string }) {
		const folderName = `${client.data.authId}/`;
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
				const videoUrl = [OBJECT_STORAGE_ENDPOINT, this.bucketName, fileName].join('/');

				client.to(user.roomUUID).emit(EVENT.DOWNLOAD_VIDEO, { videoUrl });
			}
		);

		return {};
	}

	/**
	 * user가 저장한 영상이 max count를 넘었을 때, 넘긴 영상들을 삭제하는 메서드입니다.
	 * @param client
	 */
	async handleMaxVideoCountByUser(client: Socket) {
		const videoList = await this.getUserVideoList(client.data.authId);
		if (videoList.length > MAX_VIDEO_COUNT) {
			const overs = videoList
				.sort((a, b) => b.LastModified.getTime() - a.LastModified.getTime())
				.filter((_, idx) => idx >= MAX_VIDEO_COUNT);

			Promise.all([overs.map((video) => this.deleteInterviewHistory({ client, video }))]);
		}
	}

	/**
	 * 영상 정보를 기반으로 object storage의 영상과, database의 interview docs를 삭제하는 메서드입니다.
	 * @param video - object storage에서 받아온 영상 object
	 */
	async deleteInterviewHistory({ client, video }: { client: Socket; video: S3.Object }) {
		const docsUUID = video.Key.split('/')[1];
		const params: S3.Types.DeleteObjectRequest = {
			Bucket: this.bucketName,
			Key: video.Key,
		};

		this.S3.deleteObject(params).promise();

		deleteInterviewDocs({ client, docsUUID });
	}

	/**
	 * user id를 기반으로 object storage에 저장된 영상 list를 조회 후 반환합니다.
	 * @param userId - 회원 가입한 유저의 id
	 * @returns
	 */
	async getUserVideoList(userId: string) {
		const params: S3.Types.ListObjectsV2Request = {
			Bucket: this.bucketName,
			MaxKeys: 100,
			Prefix: `${userId}/`,
		};

		const res = await this.S3.listObjectsV2(params).promise();
		return res.Contents.slice(1); // index 0 is folder
	}

	/**
	 * bucket에 cors 설정을 하는 메서드입니다.
	 * @returns
	 */
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
