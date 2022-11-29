import { InmemoryRoom, User } from 'src/types/room.type';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository {
	private rooms = new Map<string, InmemoryRoom>();
	private socketUserMap = new Map<string, User>();

	createRoom({ roomUUID, room }: { roomUUID: string; room: InmemoryRoom }) {
		this.rooms.set(roomUUID, room);
		return room;
	}

	getRoom(roomUUID: string) {
		return this.rooms.get(roomUUID);
	}

	getUsersInRoom(roomUUID: string) {
		const room = this.rooms.get(roomUUID);
		return room.users;
	}

	saveUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const room = this.rooms.get(roomUUID);
		room.users.set(user.uuid, user);
	}

	getUserByClientId(clientId: string) {
		return this.socketUserMap.get(clientId);
	}

	setUserByClientId({ clientId, user }: { clientId: string; user: User }) {
		this.socketUserMap.set(clientId, user);
	}

	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const room = this.rooms.get(roomUUID);
		room.users.delete(user.nickname);
	}

	removeUserInSocketUserMap(clientId: string) {
		this.socketUserMap.delete(clientId);
	}
}
