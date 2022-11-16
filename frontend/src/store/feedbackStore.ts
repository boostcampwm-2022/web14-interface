import { atom } from 'recoil';

export const currentTimeState = atom({
	key: 'currentTimeState',
	default: 0,
});

export const isFbClickedState = atom({
	key: 'isFbClicked',
	default: false,
});
