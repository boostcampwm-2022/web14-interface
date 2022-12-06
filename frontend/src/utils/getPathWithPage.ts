import { PAGE_TYPE } from '@constants/page.constant';
import { ROUTE_TYPE } from '@constants/route.constant';

const pageList = Object.values(PAGE_TYPE);
const pathList = Object.values(ROUTE_TYPE);
const pageToPathMap = new Map(pageList.map((p, i) => [p, pathList[i]]));

export const getPathWithPage = (page: PAGE_TYPE) => {
	return pageToPathMap.get(page);
};
