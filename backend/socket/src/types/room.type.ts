import { ROOM_STATE } from '@constant';

export interface InmemoryRoom {
	users: Map<string, User>;
	state: ROOM_STATE;
	feedbacked: Set<User>;
}

export interface User {
	nickname: string;
	role: string;
	roomUUID: string;
}
