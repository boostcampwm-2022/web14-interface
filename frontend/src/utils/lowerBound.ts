export const lowerBound = (list: number[], _key: number) => {
	const key = _key+1;
	let start = 0;
	let end = list.length - 1;
	let mid = end;

	while (start <= end) {
		mid = Math.floor((start + end) / 2);
		if (list[mid] === key) {
			return mid;
		} else {
			if (key < list[mid]) {
				end = mid - 1;
			} else {
				start = mid + 1;
			}
		}
	}
	return start <= 0 ? 0 : start - 1;
};
