import { atom, selector, selectorFamily } from 'recoil';
import { feedbackIdsState } from './feedback.atom';
import { lowerBound } from '@utils/lowerBound';

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

export const isFbClickedState = atom({
	key: 'isFbClickedState',
	default: false,
});

export const currentVideoTimeState = atom({
	key: 'currentVideoTimeState',
	default: 0,
	effects: [
		({ onSet }) => {
			onSet((newVal) => {
				const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
				video.currentTime = newVal;
			});
		},
	],
});

export const currentVideoTimeSelector = selectorFamily({
	key: 'currentVideoTimeSelector',
	get:
		() =>
		({ get }) => {
			return get(currentVideoTimeState);
		},
	set:
		(newVideoTime) =>
		({ set, get }) => {
			if (get(isFbClickedState)) {
				console.log('yes');
				set(currentVideoTimeState, newVideoTime);
				const newFocusId = lowerBound(get(feedbackIdsState), get(currentVideoTimeState));
				console.log(newFocusId);
				if (get(focusIndexState) !== newFocusId) set(focusIndexState, newFocusId);
				set(isFbClickedState, false);
			} else {
				console.log('not');
				const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
				set(currentVideoTimeState, Math.round(video.currentTime));
			}
		},
});

export const isFbSyncState = atom({
	key: 'isFbSyncState',
	default: true,
});
