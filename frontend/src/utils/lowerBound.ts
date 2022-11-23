export const lowerBound = (list: number[], _key: number) => {
	const key = _key - 1;
	let start = 0;
	let end = list.length - 1;
	let result = Math.max(0, end);
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
	console.log(list, key, result);
	return result;
};
