import { EVENT } from '@constant';
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
import { RoomService } from './service/connection/connection.service';

@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private logger = new Logger('room');

	constructor(private readonly roomSerivce: RoomService) {}

	// connection

	@SubscribeMessage(EVENT.CREATE_ROOM)
	handleCreateRoom(): SocketResponseDto {
		const res = this.roomSerivce.createRoom();
		return res;
	}

	@SubscribeMessage(EVENT.ENTER_ROOM)
	handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() roomUUID: string) {
		const res = this.roomSerivce.enterRoom({ client, server: this.server, roomUUID });
		return res;
	}

	@SubscribeMessage(EVENT.LEAVE_ROOM)
	handleLeaveRoom(@ConnectedSocket() client: Socket) {
		this.roomSerivce.leaveRoom({ client, server: this.server });
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`connected: ${client.id}`);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		this.logger.log(`disconnected: ${client.id}`);
		this.roomSerivce.disconnectUser(client);
		this.roomSerivce.leaveRoom({ client, server: this.server });
	}
}
