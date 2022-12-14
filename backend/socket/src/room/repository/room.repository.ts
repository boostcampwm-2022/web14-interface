import { ROOM_PHASE } from '@constant';
import { Room, User } from '@types';

export interface RoomRepository {
	/**
	 * uuid를 key로 repository에 유저의 socket id를 저장할 객체를 생성하고
	 * uuid를 key로 방을 식별할 수 있는 객체에 room의 상태를 LOBBY로 저장하는 메서드입니다.
	 * @param uuid room을 식별할 수 있는 고유한 key
	 */
	createRoom({ roomUUID, room }: { roomUUID: string; room: Room }): Promise<Room>;

	/**
	 * room uuid에 해당되는 room 정보를 삭제합니다.
	 * room에 속해있는 user의 정보도 전부 삭제합니다.
	 * @param roomUUID
	 */
	deleteRoom(roomUUID: string): Promise<void>;

	/**
	 * uuid로 방 정보를 가져옵니다.
	 * @param roomUUID
	 * @Return Room
	 */
	getRoom(roomUUID: string): Promise<Room>;

	/**
	 * room uuid기반으로 해당 방에 존재하는 user 배열을 반환합니다.
	 * @param roomUUID
	 * @returns User[]
	 */
	getUsersInRoom(roomUUID: string): Promise<User[]>;

	/**
	 * room uuid 기반으로 해당 방에 user를 저장합니다.
	 * @param roomUUID
	 * @param user User
	 */
	saveUserInRoom(user: User): Promise<void>;

	/**
	 * client socket id로 mapping된 user 객체를 반환합니다.
	 * @param clientId
	 * @returns User
	 */
	getUserByClientId(clientId: string): Promise<User>;

	/**
	 * user uuid로 mapping된 user 객체를 반환합니다.
	 * @param userUUID
	 * @returns User
	 */
	getUserByUserId(userUUID: string): Promise<User>;

	/**
	 * auth id로 mapping된 user 객체를 반환합니다.
	 * @param authId
	 * @returns User
	 */
	getUserIdByAuthId(authId: string): Promise<string>;

	/**
	 * roomUUID를 기반으로 해당 방에 있는 user를 제거합니다.
	 * @param clientId socket id
	 * @param user User
	 */
	removeUser(user: User): Promise<void>;

	/**
	 * 해당 room uuid의 room의 interview phase를 update 합니다.
	 * @param roomUUID
	 * @param phase
	 */
	updateRoomPhase({ roomUUID, phase }: { roomUUID: string; phase: ROOM_PHASE }): Promise<void>;

	/**
	 * update할 user 정보를 업데이트 합니다.
	 * @param updateUser - update할 props를 가진 partial user 객체
	 */
	updateUserInfo({
		uuid,
		updateUser,
	}: {
		uuid: string;
		updateUser: Partial<User>;
	}): Promise<User>;
}
