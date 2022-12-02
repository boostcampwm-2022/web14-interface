import { atom } from 'recoil';

const authPersistEffect =
	(key: string) =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue) {
			setSelf(JSON.parse(savedValue));
		}
		onSet((newVal, _, isReset) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newVal));
		});
	};

export const authState = atom({
	key: 'auth',
	default: false,
	effects: [authPersistEffect('auth')],
});
