import { EVENT } from '@constant';
import { Logger, UseFilters, UseInterceptors } from '@nestjs/common';
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
import { SocketExceptionFilter } from 'src/filter/socket-exception.filter';
import { SocketResponseInterceptor } from 'src/interceptor/socket-response.interceptor';
import { WebrtcAnswerDto, WebrtcIcecandidateDto, WebrtcOfferDto } from './dto/webrtc.dto';
import { ConnectionService } from './service/connection/connection.service';
import { InterviewService } from './service/interview/interview.service';
import { WebrtcService } from './service/webRTC/webrtc.service';

@UseInterceptors(new SocketResponseInterceptor())
@UseFilters(new SocketExceptionFilter())
@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Namespace;
	private logger = new Logger('room');

	constructor(
		private readonly connectionService: ConnectionService,
		private readonly interviewService: InterviewService,
		private readonly webrtcService: WebrtcService
	) {}

	// connection

	@SubscribeMessage(EVENT.CREATE_ROOM)
	handleCreateRoom() {
		return this.connectionService.createRoom();
	}

	@SubscribeMessage(EVENT.ENTER_ROOM)
	handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() roomUUID: string) {
		return this.connectionService.enterRoom({ client, server: this.server, roomUUID });
	}

	@SubscribeMessage(EVENT.LEAVE_ROOM)
	handleLeaveRoom(@ConnectedSocket() client: Socket) {
		return this.connectionService.leaveRoom({ client, server: this.server });
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
		this.connectionService.leaveRoom({ client, server: this.server });
		this.webrtcService.disconnectWebrtc({ client, server: this.server });
	}

	// interview

	@SubscribeMessage(EVENT.START_INTERVIEW)
	handleStartInterview(@ConnectedSocket() client: Socket) {
		return this.interviewService.startInterview({ client, server: this.server });
	}

	@SubscribeMessage(EVENT.END_INTERVIEW)
	handleEndInterview(@ConnectedSocket() client: Socket) {
		return this.interviewService.endInterview({ client, server: this.server });
	}

	@SubscribeMessage(EVENT.END_FEEDBACK)
	handleEndFeedback(@ConnectedSocket() client: Socket) {
		return this.interviewService.endFeedback({ client, server: this.server });
	}

	// webRTC

	@SubscribeMessage(EVENT.START_SIGNALING)
	handleStartSignaling(@ConnectedSocket() client: Socket) {
		return this.webrtcService.startSignaling({ client, server: this.server });
	}

	@SubscribeMessage(EVENT.OFFER)
	handleOffer(@ConnectedSocket() client: Socket, @MessageBody() connectSignal: WebrtcOfferDto) {
		return this.webrtcService.delivery({
			server: this.server,
			connectSignal,
			eventType: EVENT.OFFER,
		});
	}

	@SubscribeMessage(EVENT.ANSWER)
	handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() connectSignal: WebrtcAnswerDto) {
		return this.webrtcService.delivery({
			server: this.server,
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
			server: this.server,
			connectSignal,
			eventType: EVENT.ICECANDIDATE,
		});
	}
}
