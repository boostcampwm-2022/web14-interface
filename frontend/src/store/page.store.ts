import { atom } from 'recoil';
import { PAGE_TYPE } from '@constants/page.constant';

export const pageState = atom<PAGE_TYPE>({
	key: 'page',
	default: PAGE_TYPE.LOGIN_PAGE,
});
