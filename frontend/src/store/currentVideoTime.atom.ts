import { atom, selector } from 'recoil';
import { feedbackIdsState, isFbClickedState, isFbSyncState } from './feedback.atom';
import { focusIndexState } from './focusIndex.atom';
import { lowerBound } from '@utils/lowerBound';

const handleVideoTimeChange = ({ get, set }, newVideoTime) => {
	if (!get(isFbSyncState)) return;
	const newFocusId = lowerBound(get(feedbackIdsState), get(currentVideoTimeState));
	if (get(focusIndexState) !== newFocusId) set(focusIndexState, newFocusId);
	set(currentVideoTimeState, newVideoTime);
};

export const currentVideoTimeState = atom({
	key: 'currentVideoTimeState',
	default: 0,
});

export const currentVideoTimeSelector = selector({
	key: 'currentVideoTimeSelector',
	get: ({ get }) => {
		return get(currentVideoTimeState);
	},
	set: handleVideoTimeChange,
});
