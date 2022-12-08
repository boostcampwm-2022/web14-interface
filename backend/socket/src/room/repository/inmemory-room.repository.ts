import { ROOM_PHASE } from '@constant';
import { clientId, Room, roomUUID, User, userUUID } from '@types';
import { RoomRepository } from './room.repository';

export class InmemoryRoomRepository implements RoomRepository {
	private rooms = new Map<roomUUID, Room>();
	private usersInRoom = new Map<roomUUID, Set<userUUID>>();
	private clientUserIdMap = new Map<clientId, userUUID>();
	private userClientIdMap = new Map<userUUID, clientId>();
	private userMap = new Map<userUUID, User>();

	async createRoom({ roomUUID, room }: { roomUUID: string; room: Room }) {
		this.rooms.set(roomUUID, room);
		this.usersInRoom.set(roomUUID, new Set());
		return room;
	}

	async deleteRoom(roomUUID: string) {
		this.rooms.delete(roomUUID);
		this.usersInRoom.delete(roomUUID);
	}

	async getRoom(roomUUID: string) {
		return this.rooms.get(roomUUID);
	}

	async getUsersInRoom(roomUUID: string) {
		const userSet = this.usersInRoom.get(roomUUID);
		return [...userSet].map((uuid) => this.userMap.get(uuid));
	}

	async saveUserInRoom({
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

	async getUserByClientId(clientId: string) {
		const uuid = this.clientUserIdMap.get(clientId);
		return this.userMap.get(uuid);
	}

	async getClientIdByUser(uuid: string) {
		const clientId = this.userClientIdMap.get(uuid);
		return clientId;
	}

	async removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }) {
		const userSet = this.usersInRoom.get(roomUUID);
		userSet.delete(user.uuid);

		// cascading
		const clientId = this.userClientIdMap.get(user.uuid);
		this.userMap.delete(user.uuid);
		this.userClientIdMap.delete(user.uuid);
		this.clientUserIdMap.delete(clientId);
	}

	async getRoomPhase(roomUUID: string) {
		const room = this.rooms.get(roomUUID);
		return room.phase;
	}

	async updateRoomPhase({ roomUUID, phase }: { roomUUID: string; phase: ROOM_PHASE }) {
		const room = this.rooms.get(roomUUID);
		room.phase = phase;
	}

	async updateUserInfo({ uuid, updateUser }: { uuid: string; updateUser: Partial<User> }) {
		const user = this.userMap.get(uuid);
		for (const key in updateUser) {
			user[key] = updateUser[key];
		}
		this.userMap.set(user.uuid, user);
	}
}
