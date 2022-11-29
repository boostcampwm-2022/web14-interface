import { atom, selector } from 'recoil';
import { feedbackIdsState } from './feedback.atom';
import { lowerBound } from '@utils/lowerBound';

export const currentVideoTimeState = atom({
	key: 'currentVideoTimeState',
	default: 0,
});

export const focusIndexSelector = selector({
	key: 'focusIndexSelector',
	get: ({ get }) => {
		const startTimeList = get(feedbackIdsState).map((ids) => +ids.slice(0, 6));
		return lowerBound(startTimeList, get(currentVideoTimeState));
	},
});
