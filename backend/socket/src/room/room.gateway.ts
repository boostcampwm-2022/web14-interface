import {
	ConnectedSocket,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect {
	@SubscribeMessage('create_room')
	handleCreateRoom(): string {
		return JSON.stringify({
			success: true,
			data: {
				uuid: uuidv4(),
			},
		});
	}

	@SubscribeMessage('enter_room')
	handleEnterRoom(@ConnectedSocket() client: Socket): string {
		return 'Hello world!';
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		console.log('disconnected');
	}
}
