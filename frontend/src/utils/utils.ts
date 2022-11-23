import { FeedbackType } from '@customType/feedback';

export const findCurrentFeedback = (feedbackList: FeedbackType[], currentTime: number) => {
	let start = 0;
	let end = feedbackList.length - 1;
	let mid = end;

	while (start <= end) {
		mid = Math.floor((start + end) / 2);

		if (currentTime === feedbackList[mid].startTime) {
			return mid;
		} else {
			if (currentTime < feedbackList[mid].startTime) {
				end = mid - 1;
			} else {
				start = mid + 1;
			}
		}
	}

	return start <= 0 ? 0 : start - 1;
};
