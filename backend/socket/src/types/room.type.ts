import { ROOM_PHASE, USER_ROLE } from '@constant';

export interface InmemoryRoom {
	roomUUID: string;
	phase: ROOM_PHASE;
}

export interface User {
	uuid: string;
	nickname: string;
	role: USER_ROLE;
	roomUUID: string;
}

export type userUUID = string;
export type roomUUID = string;
export type clientId = string;
