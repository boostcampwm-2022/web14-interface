import { ROOM_PHASE } from '@constant';
import { InmemoryRoom, User } from '@types';
import { RoomRepository } from './room.repository';
import { pubClient as R } from '@config';

export class RedisRoomRepository implements RoomRepository {
	// private rooms = new Map<roomUUID, InmemoryRoom>();
	// private usersInRoom = new Map<roomUUID, Set<userUUID>>();
	// private clientUserIdMap = new Map<clientId, userUUID>();
	// private userClientIdMap = new Map<userUUID, clientId>();
	// private userMap = new Map<userUUID, User>();

	createRoom({ roomUUID, room }: { roomUUID: string; room: InmemoryRoom }): InmemoryRoom {
		throw new Error('Method not implemented.');
	}

	deleteRoom(roomUUID: string): void {
		throw new Error('Method not implemented.');
	}

	getRoom(roomUUID: string): InmemoryRoom {
		throw new Error('Method not implemented.');
	}

	getUsersInRoom(roomUUID: string): User[] {
		throw new Error('Method not implemented.');
	}

	saveUserInRoom({
		clientId,
		roomUUID,
		user,
	}: {
		clientId: string;
		roomUUID: string;
		user: User;
	}): void {
		throw new Error('Method not implemented.');
	}

	getUserByClientId(clientId: string): User {
		throw new Error('Method not implemented.');
	}

	getClientIdByUser(uuid: string): string {
		throw new Error('Method not implemented.');
	}

	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }): void {
		throw new Error('Method not implemented.');
	}

	getRoomPhase(roomUUID: string): ROOM_PHASE {
		throw new Error('Method not implemented.');
	}

	updateRoomPhase({ roomUUID, phase }: { roomUUID: string; phase: ROOM_PHASE }): void {
		throw new Error('Method not implemented.');
	}

	updateUserInfo({ uuid, updateUser }: { uuid: string; updateUser: Partial<User> }) {
		throw new Error('Method not implemented.');
	}
}
