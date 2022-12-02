import { FeedbackType } from '@customType/feedback';
import { atom, atomFamily } from 'recoil';

export const feedbackState = atomFamily<FeedbackType, string>({
	key: 'feedbackState',
	default: null,
});

export const feedbackIdsState = atom<string[]>({
	key: 'feedbackIdsState',
	default: [],
});

export const feedbackIdxMapState = atom<Map<number, number>>({
	key: 'feedbackIdxMapState',
	default: new Map(),
});

export const isFbClickedState = atom({
	key: 'isFbClickedState',
	default: false,
});

export const isFbSyncState = atom({
	key: 'isFbSyncState',
	default: true,
});
