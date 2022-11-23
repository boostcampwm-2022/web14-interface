import { Server } from 'socket.io';

export interface RoomRepository<T> {
	repository: T;
	createRoom(uuid: string): void;
	enterRoom(clientId: string, nickname: string, uuid: string): void;
	broadcastUserList(data: string, server: Server): void;
	leaveRoom(data: string, clientId: string): void;
}
