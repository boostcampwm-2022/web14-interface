import { Server, Socket } from 'socket.io';

export interface RoomRepository<T> {
	repository: T;
	createRoom(uuid: string): void;
	enterRoom(clientId: string, nickname: string, uuid: string): void;
	broadcastUserList(clientId: string, server: Server, eventType: string): string;
	leaveRoom(clientId: Socket): void;
	changeRoomState(client: Socket, state: string): void;
}
