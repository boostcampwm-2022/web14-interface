import { ROOM_STATE } from '@constant';

export interface repositoryType {
	[key: string]: { [key: string]: string };
}

export interface InmemoryRoom {
	users: User[];
	state: ROOM_STATE;
	feedbacked: Set<User>;
}

export interface User {
	nickname: string;
	role: string;
}
