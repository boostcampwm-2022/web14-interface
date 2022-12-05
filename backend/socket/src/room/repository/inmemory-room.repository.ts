import { ROOM_PHASE } from '@constant';
import { clientId, InmemoryRoom, roomUUID, User, userUUID } from '@types';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository {
	private rooms = new Map<roomUUID, InmemoryRoom>();
	private usersInRoom = new Map<roomUUID, Set<userUUID>>();
	private clientUserIdMap = new Map<clientId, userUUID>();
	private userClientIdMap = new Map<userUUID, clientId>();
	private userMap = new Map<userUUID, User>();

	createRoom({ roomUUID, room }: { roomUUID: string; room: InmemoryRoom }) {
		this.rooms.set(roomUUID, room);
		this.usersInRoom.set(roomUUID, new Set());
		return room;
	}

	deleteRoom(roomUUID: string) {
		this.rooms.delete(roomUUID);
		this.usersInRoom.delete(roomUUID);
	}

	getRoom(roomUUID: string) {
		return this.rooms.get(roomUUID);
	}

	getUsersInRoom(roomUUID: string) {
		const userSet = this.usersInRoom.get(roomUUID);
		return [...userSet].map((uuid) => this.userMap.get(uuid));
	}

	saveUserInRoom({
		clientId,
		roomUUID,
		user,
	}: {
		clientId: string;
		roomUUID: string;
		user: User;
	}) {
		const userSet = this.usersInRoom.get(roomUUID);
		userSet.add(user.uuid);

		this.userMap.set(user.uuid, user);
		this.clientUserIdMap.set(clientId, user.uuid);
		this.userClientIdMap.set(user.uuid, clientId);
	}

	getUserByClientId(clientId: string) {
		const uuid = this.clientUserIdMap.get(clientId);
		return this.userMap.get(uuid);
	}

	getClientIdByUser(uuid: string) {
		const clientId = this.userClientIdMap.get(uuid);
		return clientId;
	}

	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const userSet = this.usersInRoom.get(roomUUID);
		userSet.delete(user.uuid);

		// cascading
		const clientId = this.userClientIdMap.get(user.uuid);
		this.userMap.delete(user.uuid);
		this.userClientIdMap.delete(user.uuid);
		this.clientUserIdMap.delete(clientId);
	}

	getRoomPhase(roomUUID: string): ROOM_PHASE {
		const room = this.rooms.get(roomUUID);
		return room.phase;
	}

	updateRoomPhase({ roomUUID, phase }: { roomUUID: string; phase: ROOM_PHASE }) {
		const room = this.rooms.get(roomUUID);
		room.phase = phase;
	}

	updateUserInfo({ uuid, updateUser }: { uuid: string; updateUser: Partial<User> }) {
		const user = this.userMap.get(uuid);
		for (const key in updateUser) {
			user[key] = updateUser[key];
		}
		this.userMap.set(user.uuid, user);
	}
}
