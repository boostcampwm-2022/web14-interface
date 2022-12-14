import { ROOM_PHASE } from '@constant';
import { authId, clientId, Room, roomUUID, User, userUUID } from '@types';
import { RoomRepository } from './room.repository';

export class InmemoryRoomRepository implements RoomRepository {
	private rooms = new Map<roomUUID, Room>();
	private usersInRoom = new Map<roomUUID, Set<userUUID>>();
	private clientUserIdMap = new Map<clientId, userUUID>();
	private authIdUserIdMap = new Map<authId, userUUID>();
	private userMap = new Map<userUUID, User>();

	async createRoom({ roomUUID, room }: { roomUUID: string; room: Room }) {
		this.rooms.set(roomUUID, room);
		this.usersInRoom.set(roomUUID, new Set());
		return room;
	}

	async deleteRoom(roomUUID: string) {
		// cascading
		const users = this.usersInRoom.get(roomUUID);
		users.forEach(async (userUUID) => {
			const user = await this.getUserByUserId(userUUID);
			this.removeUser(user);
		});

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

	async getUserByUserId(userUUID: string) {
		const user = this.userMap.get(userUUID);
		return user;
	}

	async getUserIdByAuthId(authId: string) {
		const userUUID = this.authIdUserIdMap.get(authId);
		return userUUID;
	}

	async getUserByClientId(clientId: string) {
		const uuid = this.clientUserIdMap.get(clientId);
		return this.userMap.get(uuid);
	}

	async saveUserInRoom(user: User) {
		const userSet = this.usersInRoom.get(user.roomUUID);
		userSet.add(user.uuid);

		this.userMap.set(user.uuid, user);
		this.authIdUserIdMap.set(user.authId, user.uuid);
		this.clientUserIdMap.set(user.clientId, user.uuid);
	}

	async removeUser(user: User) {
		const userSet = this.usersInRoom.get(user.roomUUID);
		userSet.delete(user.uuid);

		// cascading
		this.userMap.delete(user.uuid);
		this.clientUserIdMap.delete(user.clientId);
		this.authIdUserIdMap.delete(user.authId);
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

		return this.userMap.get(user.uuid);
	}
}
