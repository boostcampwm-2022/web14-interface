import { ONE_MINUTE, ONE_SECOND } from '@constants/time.constant';
import { EditableFeedbackType, FeedbackItemType, FeedbackType } from '@customType/feedback';

export const mmssFormatter = (ms: number) => {
	const mm = paddingFormatter(ms / ONE_MINUTE);
	ms %= ONE_MINUTE;
	const ss = paddingFormatter(ms / ONE_SECOND);

	return `${mm}:${ss}`;
};

const paddingFormatter = (n: number) => {
	n = Math.floor(n);
	const l = (n + '').length;
	const sliceSize = l > 2 ? l : 2;
	return ('00' + n).slice(-sliceSize);
};

export const getFirstLabeledFbList = (
	fbList: EditableFeedbackType[] | FeedbackType[]
): FeedbackItemType[] => {
	let prev = -1;
	return fbList.map((fb_) => {
		const fb = { ...fb_ };
		fb.isFirst = false;
		if (fb.startTime > prev) {
			prev = fb.startTime;
			fb.isFirst = true;
		}

		return fb;
	});
};
