import { atom, selector } from 'recoil';
import { feedbackIdsState, feedbackState, isFbSyncState } from './feedback.atom';
import { lowerBound } from '@utils/lowerBound';

export const currentVideoTimeState = atom({
	key: 'currentVideoTimeState',
	default: 0,
});

// TODO: isFbSync 처리
export const focusIndexSelector = selector({
	key: 'focusIndexSelector',
	get: ({ get }) => {
		if (!get(isFbSyncState)) return null;
		const startTimeList = get(feedbackIdsState).map((ids) => +ids.slice(0, 6));
		console.log(startTimeList);
		return lowerBound(startTimeList, get(currentVideoTimeState));
	},
});
