import { atom } from 'recoil';

export const roomUUIDState = atom({
	key: 'roomUUIDState',
	default: null,
});

export const othersInRoomState = atom({
	key: 'othersInRoomState',
	default: [],
});

export const meInRoomState = atom({
	key: 'meInRoomState',
	default: null,
});
