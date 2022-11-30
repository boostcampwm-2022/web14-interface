import { ROOM_PHASE, USER_ROLE } from '@constant';
import { InmemoryRoom, User } from 'src/types/room.type';
import { RoomRepository } from './interface-room.repository';

export class InmemoryRoomRepository implements RoomRepository {
	private rooms = new Map<string, InmemoryRoom>();
	private usersInRoom = new Map<string, Set<string>>();
	private clientUserIdMap = new Map<string, string>();
	private userMap = new Map<string, User>();

	createRoom({ roomUUID, room }: { roomUUID: string; room: InmemoryRoom }) {
		this.rooms.set(roomUUID, room);
		return room;
	}

	deleteRoom(roomUUID: string) {
		this.rooms.delete(roomUUID);
	}

	getRoom(roomUUID: string) {
		return this.rooms.get(roomUUID);
	}

	getUsersInRoom(roomUUID: string) {
		const userSet = this.usersInRoom.get(roomUUID);
		return [...userSet].map((uuid) => this.userMap.get(uuid));
	}

	saveUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const userSet = this.usersInRoom.get(roomUUID);
		userSet.add(user.uuid);
		this.userMap.set(user.uuid, user);
	}

	getUserByClientId(clientId: string) {
		const uuid = this.clientUserIdMap.get(clientId);
		return this.userMap.get(uuid);
	}

	setUserByClientId({ clientId, user }: { clientId: string; user: User }) {
		this.clientUserIdMap.set(clientId, user.uuid);
		this.userMap.set(user.uuid, user);
	}

	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const userSet = this.usersInRoom.get(roomUUID);
		userSet.delete(user.uuid);
		this.userMap.delete(user.uuid);
	}

	removeUserInSocketUserMap(clientId: string) {
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

	updateUserRole({ uuid, role }: { uuid: string; role: USER_ROLE }) {
		const user = this.userMap.get(uuid);
		user.role = role;
	}
}
