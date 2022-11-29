import { ROOM_PHASE } from '@constant';

export interface InmemoryRoom {
	users: Map<string, User>;
	phase: ROOM_PHASE;
	feedbacked: Set<User>;
}

export interface User {
	uuid: string;
	nickname: string;
	role: string;
	roomUUID: string;
}
