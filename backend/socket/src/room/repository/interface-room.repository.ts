import { InmemoryRoom, User } from '@types';

export interface RoomRepository {
	/**
	 * uuid를 key로 repository에 유저의 socket id를 저장할 객체를 생성하고
	 * uuid를 key로 방을 식별할 수 있는 객체에 room의 상태를 LOBBY로 저장하는 메서드입니다.
	 * @param uuid room을 식별할 수 있는 고유한 key
	 */
	createRoom({ roomUUID, room }: { roomUUID: string; room: InmemoryRoom }): InmemoryRoom;
	getRoom(roomUUID: string): InmemoryRoom;
	getUsersInRoom(roomUUID: string): Map<string, User>;
	saveUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }): void;
	getUserByClientId(clientId: string): User;
	setUserByClientId({ clientId, user }: { clientId: string; user: User }): void;
	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }): void;
}
