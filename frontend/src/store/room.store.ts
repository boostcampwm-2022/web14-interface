import { UserType } from '@customType/user';
import { atom } from 'recoil';

export const roomUUIDState = atom({
	key: 'roomUUIDState',
	default: null,
});

export const othersInRoomState = atom<UserType[]>({
	key: 'othersInRoomState',
	default: [],
});

export const meInRoomState = atom<UserType>({
	key: 'meInRoomState',
	default: null,
});
