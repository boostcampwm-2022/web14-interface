export const lowerBound = (list: number[], key: number) => {
	let start = 0;
	let end = list.length;
	let result = end;
	let mid: number;

	while (start <= end) {
		mid = Math.floor((start + end) / 2);
		if (list[mid] < key) {
			start = mid + 1;
			continue;
		}
		result = Math.min(result, mid);
		end = mid - 1;
	}
	return result;
};
