import { ROOM_PHASE } from '@constant';

export interface InmemoryRoom {
	roomUUID: string;
	phase: ROOM_PHASE;
	feedbackCount: number;
}

export interface User {
	uuid: string;
	nickname: string;
	role: string;
	roomUUID: string;
}
