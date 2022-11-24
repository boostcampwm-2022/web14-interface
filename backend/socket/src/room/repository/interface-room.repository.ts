import { Server, Socket } from 'socket.io';

export interface RoomRepository<T> {
	repository: T;
	/**
	 * uuid를 key로 repository에 유저의 socket id를 저장할 객체를 생성하고
	 * uuid를 key로 방을 식별할 수 있는 객체에 room의 상태를 LOBBY로 저장하는 메서드입니다.
	 * @param uuid room을 식별할 수 있는 고유한 key
	 */
	createRoom(uuid: string): void;

	/**
	 * uuid로 방을 식별하여 유저의 socket id를 저장하는 메서드입니다.
	 * @param clientId socket id
	 * @param roomUUID room을 식별할 수 있는 고유한 key
	 */
	enterRoom({ clientId, roomUUID }: { clientId: string; roomUUID: string }): void;

	/**
	 * 같은 room에 속한 유저에게 broadcast하는 메서드입니다.
	 * @param clientId socket id
	 * @param server server instance
	 * @param eventType broadcast할 event 이름
	 * @Returns broadcast할 data
	 */
	broadcastUserList(clientId: string, server: Server, eventType: string): string;

	/**
	 * room을 나가는 메서드입니다.
	 * @param clientId socket id
	 */
	leaveRoom(clientId: Socket): void;

	/**
	 * room의 상태를 변경하는 메서드입니다.
	 * @param client socket instance
	 * @param state room의 상태 (lobby -> interview -> feedback)
	 */
	changeRoomState(client: Socket, state: string): void;

	/**
	 * feedback을 완료한 interviewer를 저장하는 메서드입니다.
	 * @param clientId socket id
	 * @param server server instance
	 * @return 완료한 interviewer의 수
	 */
	countFeedback(clientId: string, server: Server): number;
}
