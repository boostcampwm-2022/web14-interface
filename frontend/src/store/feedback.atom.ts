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
