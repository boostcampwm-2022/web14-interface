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
import { RoomService } from './room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private logger = new Logger('room');
	constructor(private readonly roomSerivce: RoomService) {}
	@SubscribeMessage(ROOM_EVENT.CREATE_ROOM)
	handleCreateRoom(): string {
		const uuid = this.roomSerivce.createRoom();
		return JSON.stringify({
			success: true,
			data: {
				uuid,
			},
		});
	}

	@SubscribeMessage(ROOM_EVENT.ENTER_ROOM)
	handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
		this.roomSerivce.enterRoom(client, data, this.server);
	}

	@SubscribeMessage(ROOM_EVENT.LEAVE_ROOM)
	handleLeaveRoom(@ConnectedSocket() client: Socket) {
		this.roomSerivce.leaveRoom(client, this.server);
	}

	@SubscribeMessage(ROOM_EVENT.START_INTERVIEW)
	handleStartInterview(@ConnectedSocket() client: Socket) {
		return this.roomSerivce.startInterview(client, this.server);
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
		this.roomSerivce.leaveRoom(client, this.server);
	}
}
