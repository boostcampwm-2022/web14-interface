import { atom } from 'recoil';

export const currentTimeState = atom({
	key: 'currentTimeState',
	default: 0,
});

export const isFbClicekd = atom({
	key: 'isFbClicekd',
	default: false,
});
