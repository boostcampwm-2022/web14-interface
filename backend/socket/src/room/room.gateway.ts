import { EVENT } from '@constant';
import { Logger, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { pipeOptions } from 'src/config/pipe.config';
import { SocketExceptionFilter } from 'src/filter/socket-exception.filter';
import { SocketResponseInterceptor } from 'src/interceptor/socket-response.interceptor';
import { setUserIdInClient } from 'util/rest-api.util';
import { ChatRequestDto } from './dto/chat.dto';
import { UpdateMediaDto } from './dto/update-media-info.dto';
import { WebrtcAnswerDto, WebrtcIcecandidateDto, WebrtcOfferDto } from './dto/webrtc.dto';
import { ChatService } from './service/chat/chat.service';
import { ConnectionService } from './service/connection/connection.service';
import { InterviewService } from './service/interview/interview.service';
import { ObjectStorageService } from './service/objectstorage/objectstorage.service';
import { WebrtcService } from './service/webRTC/webrtc.service';

@UsePipes(new ValidationPipe(pipeOptions))
@UseInterceptors(new SocketResponseInterceptor())
@UseFilters(new SocketExceptionFilter())
@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Namespace;
	private logger = new Logger('room');

	constructor(
		private readonly connectionService: ConnectionService,
		private readonly interviewService: InterviewService,
		private readonly chatService: ChatService,
		private readonly webrtcService: WebrtcService,
		private readonly objectStorageService: ObjectStorageService
	) {}

	// connection

	@SubscribeMessage(EVENT.CREATE_ROOM)
	handleCreateRoom(@ConnectedSocket() client: Socket) {
		return this.connectionService.createRoom(client);
	}

	@SubscribeMessage(EVENT.ENTER_ROOM)
	handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() roomUUID: string) {
		return this.connectionService.enterRoom({ client, roomUUID });
	}

	@SubscribeMessage(EVENT.LEAVE_ROOM)
	handleLeaveRoom(@ConnectedSocket() client: Socket) {
		return this.connectionService.leaveRoom(client);
	}

	@SubscribeMessage(EVENT.UPDATE_MEDIA_INFO)
	handleUpdateMediaInfo(
		@ConnectedSocket() client: Socket,
		@MessageBody() updateMediaDto: UpdateMediaDto
	) {
		return this.connectionService.updateUserMediaInfo({ client, updateMediaDto });
	}

	async handleConnection(@ConnectedSocket() client: Socket) {
		await setUserIdInClient(client);
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
		this.objectStorageService.deleteVideoMemoryData(client.id);
		this.webrtcService.disconnectWebrtc(client);
		this.connectionService.leaveRoom(client);
	}

	// interview

	@SubscribeMessage(EVENT.START_INTERVIEW)
	handleStartInterview(@ConnectedSocket() client: Socket) {
		return this.interviewService.startInterview(client);
	}

	@SubscribeMessage(EVENT.END_INTERVIEW)
	handleEndInterview(@ConnectedSocket() client: Socket) {
		return this.interviewService.endInterview({ client, server: this.server });
	}

	@SubscribeMessage(EVENT.END_FEEDBACK)
	handleEndFeedback(@ConnectedSocket() client: Socket) {
		return this.interviewService.endFeedback({ client, server: this.server });
	}

	// objectStorage

	@SubscribeMessage(EVENT.ALLOW_BUCKET_CORS)
	handleAllowBucketCors() {
		return this.objectStorageService.setCorsAtBucket();
	}

	@SubscribeMessage(EVENT.STREAM_VIDEO)
	handleStreamVideo(@ConnectedSocket() client: Socket, @MessageBody() videoBuffer: Buffer) {
		return this.objectStorageService.mediaStreaming({ client, videoBuffer });
	}

	@SubscribeMessage(EVENT.FINISH_STEAMING)
	handleFinishStreaming(@ConnectedSocket() client: Socket, @MessageBody() docsUUID: string) {
		return this.objectStorageService.uploadVideo({ client, docsUUID });
	}

	// chat

	@SubscribeMessage(EVENT.SEND_MESSAGE)
	handleReceiveMessage(
		@ConnectedSocket() client: Socket,
		@MessageBody() chatRequestDto: ChatRequestDto
	) {
		return this.chatService.handleChat({ client, server: this.server, chatRequestDto });
	}

	// webRTC

	@SubscribeMessage(EVENT.START_SIGNALING)
	handleStartSignaling(@ConnectedSocket() client: Socket) {
		return this.webrtcService.startSignaling(client);
	}

	@SubscribeMessage(EVENT.OFFER)
	handleOffer(@ConnectedSocket() client: Socket, @MessageBody() connectSignal: WebrtcOfferDto) {
		return this.webrtcService.delivery({
			client,
			connectSignal,
			eventType: EVENT.OFFER,
		});
	}

	@SubscribeMessage(EVENT.ANSWER)
	handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() connectSignal: WebrtcAnswerDto) {
		return this.webrtcService.delivery({
			client,
			connectSignal,
			eventType: EVENT.ANSWER,
		});
	}

	@SubscribeMessage(EVENT.ICECANDIDATE)
	handleIceCandidate(
		@ConnectedSocket() client: Socket,
		@MessageBody() connectSignal: WebrtcIcecandidateDto
	) {
		return this.webrtcService.delivery({
			client,
			connectSignal,
			eventType: EVENT.ICECANDIDATE,
		});
	}
}
