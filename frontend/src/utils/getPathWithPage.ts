import { PAGE_TYPE } from '@constants/page.constant';
import { PATH_TYPE } from '@constants/path.constant';

const pageList = Object.values(PAGE_TYPE);
const pathList = Object.values(PATH_TYPE);
const pageToPathMap = new Map(pageList.map((p, i) => [p, pathList[i]]));

export const getPathWithPage = (page: PAGE_TYPE) => {
	return pageToPathMap.get(page);
};
