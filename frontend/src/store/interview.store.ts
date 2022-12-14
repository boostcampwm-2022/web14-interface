import { atom } from 'recoil';

export const docsUUIDState = atom({
	key: 'docsUUIDState',
	default: null,
});

export const completedFbCntState = atom({
	key: 'completedFbCntState',
	default: 0,
});
