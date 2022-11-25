import { atom } from 'recoil';

export const focusIndexState = atom({
	key: 'focusIndexState',
	default: 0,
	effects: [
		({ onSet }) => {
			onSet((newVal) => {
				console.log(newVal);
				const targetFb = document.getElementById(`fb-${newVal}`);
				if (targetFb) targetFb.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		},
	],
});
