import { EditableFeedbackType } from '@customType/feedback';
import { getFirstLabeledFbList } from '@utils/common.util';
import { atom, atomFamily, selector } from 'recoil';

export const feedbackState = atomFamily<EditableFeedbackType, string>({
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

export const feedbackListSelector = selector({
	key: 'feedbackListSelector',
	get: ({ get }) => {
		const fbList = get(feedbackIdsState).map((id) => get(feedbackState(id)));
		const firstLabeledFbList = getFirstLabeledFbList(fbList);
		return firstLabeledFbList;
	},
});

export const feedbackDtoSelector = selector({
	key: 'feedbackSelector',
	get: ({ get }) => {
		return get(feedbackIdsState).map((id) => {
			const fb = { ...get(feedbackState(id)) };
			delete fb.readOnly;
			return fb;
		});
	},
});
