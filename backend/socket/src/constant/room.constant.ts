export const ROOM_REPOSITORY_INTERFACE = 'roomRepository';
export const MAX_COUNT = 4;
export enum ROOM_EVENT {
	CREATE_ROOM = 'create_room',
	ENTER_ROOM = 'enter_room',
	USER_ENTER = 'user_enter',
	LEAVE_ROOM = 'leave_room',
	START_INTERVIEW = 'start_interview',
	JOIN_INTERVIEW = 'join_interview',
}
export enum ROOM_STATE {
	LOBBY = 'lobby',
	INTERVIEW = 'interview',
	FEEDBACK = 'feedback',
}
