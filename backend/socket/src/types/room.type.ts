import { ROOM_PHASE, USER_ROLE } from '@constant';

export interface Room {
	roomUUID: string;
	phase: ROOM_PHASE;
}

export interface User {
	uuid: string;
	nickname: string;
	role: USER_ROLE;
	roomUUID: string;
	clientId: string;
	authId: string;
	video: string;
	audio: string;
}

export type userUUID = string;
export type roomUUID = string;
export type clientId = string;
export type authId = string;
