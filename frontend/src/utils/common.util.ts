import { ONE_MINUTE, ONE_SECOND } from '@constants/time.constant';

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
