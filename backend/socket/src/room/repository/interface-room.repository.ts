import { InmemoryRoom, User } from '@types';

export interface RoomRepository {
	/**
	 * uuid를 key로 repository에 유저의 socket id를 저장할 객체를 생성하고
	 * uuid를 key로 방을 식별할 수 있는 객체에 room의 상태를 LOBBY로 저장하는 메서드입니다.
	 * @param uuid room을 식별할 수 있는 고유한 key
	 */
	createRoom({ roomUUID, room }: { roomUUID: string; room: InmemoryRoom }): InmemoryRoom;

	/**
	 * uuid로 방 정보를 가져옵니다.
	 * @param roomUUID
	 * @Return InmemoryRoom
	 */
	getRoom(roomUUID: string): InmemoryRoom;

	/**
	 * room uuid기반으로 해당 방에 존재하는 user 배열을 반환합니다.
	 * @param roomUUID
	 * @returns User[]
	 */
	getUsersInRoom(roomUUID: string): User[];

	/**
	 * room uuid 기반으로 해당 방에 user를 저장합니다.
	 * @param roomUUID
	 * @param user User
	 */
	saveUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }): void;

	/**
	 * client socket id로 mapping된 user 객체를 반환합니다.
	 * @param clientId
	 * @returns User
	 */
	getUserByClientId(clientId: string): User;

	/**
	 * client socket id와 user 객체를 map에 저장합니다.
	 * @param clientId
	 * @param user
	 * @returns User
	 */
	setUserByClientId({ clientId, user }: { clientId: string; user: User }): void;

	/**
	 * roomUUID를 기반으로 해당 방에 있는 user를 제거합니다.
	 * @param clientId socket id
	 * @param user User
	 */
	removeUserInRoom({ roomUUID, user }: { roomUUID: string; user: User }): void;

	/**
	 * client socket id에 mapping된 user객체를 지웁니다.
	 * @param clientId
	 */
	removeUserInSocketUserMap(clientId: string): void;
}
