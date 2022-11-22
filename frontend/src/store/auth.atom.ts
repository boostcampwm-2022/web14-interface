import { atom } from 'recoil';

// TODO: reset되는 경우 effect를 통해 phase도 초기화 시킨다.
export const authState = atom({
	key: 'auth',
	default: false,
});
