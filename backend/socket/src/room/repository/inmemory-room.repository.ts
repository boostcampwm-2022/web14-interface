import { InmemoryRoom, User } from 'src/types/room.type';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository {
	private rooms = new Map<string, InmemoryRoom>();
	private userMap = new Map<string, User>();

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
		room.users.set(user.nickname, user);
	}

	getUserByClientId(clientId: string) {
		return this.userMap.get(clientId);
	}

	setUserByClientId({ clientId, user }: { clientId: string; user: User }) {
		this.userMap.set(clientId, user);
	}

	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const room = this.rooms.get(roomUUID);
		room.users.delete(user.nickname);
	}
}
