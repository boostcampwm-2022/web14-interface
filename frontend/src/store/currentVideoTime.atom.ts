import { atom, selectorFamily } from 'recoil';
import { feedbackIdsState, isFbClickedState, isFbSyncState } from './feedback.atom';
import { focusIndexState } from './focusIndex.atom';
import { lowerBound } from '@utils/lowerBound';

const handleVideoTimeChange =
	(newVideoTime: number) =>
	({ set, get }) => {
		if (get(isFbClickedState)) {
			set(currentVideoTimeState, newVideoTime);
			setVideoElementTime(newVideoTime);

			set(isFbClickedState, false);
		} else if (get(isFbSyncState)) {
			setVideoTimeState(set);
			updateFocusIndex(get, set);
		}
	};

const setVideoElementTime = (newVideoTime) => {
	const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
	video.currentTime = newVideoTime;
};

const updateFocusIndex = (get, set) => {
	const newFocusId = lowerBound(get(feedbackIdsState), get(currentVideoTimeState));
	if (get(focusIndexState) !== newFocusId) set(focusIndexState, newFocusId);
};

const setVideoTimeState = (set) => {
	const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
	set(currentVideoTimeState, Math.floor(video.currentTime));
};

export const currentVideoTimeState = atom({
	key: 'currentVideoTimeState',
	default: 0,
});

export const currentVideoTimeSelector = selectorFamily({
	key: 'currentVideoTimeSelector',
	get:
		() =>
		({ get }) => {
			return get(currentVideoTimeState);
		},
	set: handleVideoTimeChange,
});
