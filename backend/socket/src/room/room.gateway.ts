import { Logger } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomService } from './room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
		const { nickname, uuid } = JSON.parse(data);
		this.roomSerivce.enterRoom(client, nickname, uuid);
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
	}
}
