import { FeedbackType } from '@customType/feedback';
import { atom, atomFamily } from 'recoil';

export const feedbackState = atomFamily<FeedbackType, number>({
	key: 'feedbackState',
	default: null,
});

export const feedbackIdsState = atom<number[]>({
	key: 'feedbackIdsState',
	default: [],
});

export const isFbClickedState = atom({
	key: 'isFbClickedState',
	default: false,
});

export const isFbSyncState = atom({
	key: 'isFbSyncState',
	default: true,
});