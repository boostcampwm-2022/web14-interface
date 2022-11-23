import { atom } from 'recoil';

const newFocusIndexEffect = ({ onSet }) => {
	onSet((newVal) => {
		const targetFb = document.querySelectorAll(`.feedbackBox :nth-child(${newVal})`)[0];
		if (targetFb) targetFb.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
};

export const focusIndexState = atom({
	key: 'focusIndexState',
	default: null,
	effects: [newFocusIndexEffect],
});
