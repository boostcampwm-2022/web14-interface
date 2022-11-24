import { ROOM_EVENT } from '@constant';
import { Logger } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketResponseDto } from 'src/room/dto/socket-response.dto';
import { RoomService } from './room.service';

@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private logger = new Logger('room');

	constructor(private readonly roomSerivce: RoomService) {}

	@SubscribeMessage(ROOM_EVENT.CREATE_ROOM)
	handleCreateRoom(): SocketResponseDto {
		const uuid = this.roomSerivce.createRoom();
		return new SocketResponseDto({ success: true, data: { uuid } });
	}

	@SubscribeMessage(ROOM_EVENT.ENTER_ROOM)
	handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() roomUUID: string) {
		const users = this.roomSerivce.enterRoom({ client, server: this.server, roomUUID });
		return new SocketResponseDto({ success: true, data: { users } });
	}

	@SubscribeMessage(ROOM_EVENT.LEAVE_ROOM)
	handleLeaveRoom(@ConnectedSocket() client: Socket) {
		this.roomSerivce.leaveRoom(client, this.server);
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
		this.roomSerivce.leaveRoom(client, this.server);
	}

	// @SubscribeMessage(ROOM_EVENT.START_INTERVIEW)
	// handleStartInterview(@ConnectedSocket() client: Socket) {
	// 	return this.roomSerivce.startInterview(client, this.server);
	// }

	// @SubscribeMessage(ROOM_EVENT.END_INTERVIEW)
	// handleEndInterview(@ConnectedSocket() client: Socket) {
	// 	return this.roomSerivce.endInterview(client, this.server);
	// }

	// @SubscribeMessage(ROOM_EVENT.END_FEEDBACK)
	// handleEndFeedback(@ConnectedSocket() client: Socket) {
	// 	this.roomSerivce.endFeedback(client, this.server);
	// }
}
