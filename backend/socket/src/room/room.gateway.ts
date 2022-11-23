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
	@SubscribeMessage('create_room')
	handleCreateRoom(): string {
		const uuid = this.roomSerivce.createRoom();
		return JSON.stringify({
			success: true,
			data: {
				uuid,
			},
		});
	}

	@SubscribeMessage('enter_room')
	handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
		this.roomSerivce.enterRoom(client, data, this.server);
	}

	@SubscribeMessage('leave_room')
	handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
		this.roomSerivce.leaveRoom(client, data, this.server);
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
	}
}
