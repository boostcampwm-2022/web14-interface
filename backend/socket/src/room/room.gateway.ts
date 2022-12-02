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
import { ConnectionService } from './service/connection/connection.service';
import { InterviewService } from './service/interview/interview.service';

@UseInterceptors(new SocketResponseInterceptor())
@UseFilters(new SocketExceptionFilter())
@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Namespace;
	private logger = new Logger('room');

	constructor(
		private readonly connectionService: ConnectionService,
		private readonly interviewService: InterviewService
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
}
