import { SOCKET_RES_MESSAGE, SOCKET_TOAST_MESSAGE } from '@constants/socket.constant';
import { ONE_MINUTE, ONE_SECOND } from '@constants/time.constant';
import { EditableFeedbackType, FeedbackItemType, FeedbackType } from '@customType/feedback';
import useToast, { TOAST_TYPE } from '@hooks/useToast';

export const secMMSSFormatter = (totalSec: number) => {
	const min = Math.floor(totalSec / 60)
		.toString()
		.padStart(2, '0');
	const sec = (totalSec % 60).toString().padStart(2, '0');

	return `${min}:${sec}`;
};

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

export const findToastMessage = (message) => {
	switch (message) {
		case SOCKET_RES_MESSAGE.NO_ROOM:
			return SOCKET_TOAST_MESSAGE.NO_ROOM;
		case SOCKET_RES_MESSAGE.BUSY_ROOM:
			return SOCKET_TOAST_MESSAGE.BUSY_ROOM;
		case SOCKET_RES_MESSAGE.EXIST_SAME_AUTH_ID:
			return SOCKET_TOAST_MESSAGE.EXIST_SAME_AUTH_ID;
		case SOCKET_RES_MESSAGE.FULL_ROOM:
			return SOCKET_TOAST_MESSAGE.FULL_ROOM;
		case SOCKET_RES_MESSAGE.NOT_ENOUGHT_USER:
			return SOCKET_TOAST_MESSAGE.NOT_ENOUGHT_USER;
		default:
			return null;
	}
};