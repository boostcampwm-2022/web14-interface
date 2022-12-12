import { ROOM_PHASE } from '@constant';
import { Room, User } from '@types';
import { RoomRepository } from './room.repository';
import { pubClient as R } from '@config';

export class RedisRoomRepository implements RoomRepository {
	async createRoom({ roomUUID, room }: { roomUUID: string; room: Room }): Promise<Room> {
		await R.hSet(`rooms:${roomUUID}`, { ...room });
		return this.transformEmptyObject(room);
	}

	async deleteRoom(roomUUID: string): Promise<void> {
		await R.del(`rooms:${roomUUID}`);
	}

	async getRoom(roomUUID: string): Promise<Room> {
		const room: any = await R.hGetAll(`rooms:${roomUUID}`);
		return this.transformEmptyObject(room);
	}

	async getUsersInRoom(roomUUID: string): Promise<User[]> {
		const userIdList = await R.sMembers(`memberIds:${roomUUID}`);

		const users: any[] = await Promise.all(
			userIdList.map((userId) => R.hGetAll(`users:${userId}`))
		);

		return users.filter((user) => this.transformEmptyObject(user));
	}

	async saveUserInRoom({
		clientId,
		roomUUID,
		user,
	}: {
		clientId: string;
		roomUUID: string;
		user: User;
	}): Promise<void> {
		await R.multi()
			.sAdd(`memberIds:${roomUUID}`, user.uuid)
			.hSet(`users:${user.uuid}`, { ...user })
			.set(`userIds:${clientId}`, user.uuid)
			.set(`clientIds:${user.uuid}`, clientId)
			.exec();
	}

	async getUserByClientId(clientId: string): Promise<User> {
		const userUUID = await R.get(`userIds:${clientId}`);
		const user: any = await R.hGetAll(`users:${userUUID}`);
		return this.transformEmptyObject(user);
	}

	async getClientIdByUser(uuid: string): Promise<string> {
		const clientId = await R.get(`clientIds:${uuid}`);
		return clientId;
	}

	async removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }): Promise<void> {
		const clientId = await R.get(`clientIds:${user.uuid}`);
		await R.multi()
			.sRem(`memberIds:${roomUUID}`, user.uuid)
			.del(`users:${user.uuid}`)
			.del(`clientIds:${user.uuid}`)
			.del(`userIds:${clientId}`)
			.exec();
	}

	async getRoomPhase(roomUUID: string): Promise<ROOM_PHASE> {
		const phase: any = await R.hGet(`rooms:${roomUUID}`, 'phase');
		return phase;
	}

	async updateRoomPhase({
		roomUUID,
		phase,
	}: {
		roomUUID: string;
		phase: ROOM_PHASE;
	}): Promise<void> {
		await R.hSet(`rooms:${roomUUID}`, 'phase', phase);
	}

	async updateUserInfo({
		uuid,
		updateUser,
	}: {
		uuid: string;
		updateUser: Partial<User>;
	}): Promise<void> {
		for (const key in updateUser) {
			await R.hSet(`users:${uuid}`, `${key}`, updateUser[key]);
		}
	}

	transformEmptyObject(object: any) {
		if (Object.keys(object).length === 0) {
			return null;
		}
		return object;
	}
}
