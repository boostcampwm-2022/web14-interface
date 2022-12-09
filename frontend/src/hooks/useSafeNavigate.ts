import { useSetRecoilState } from 'recoil';
import { pageState } from '@store/page.store';
import { PAGE_TYPE } from '@constants/page.constant';

const useSafeNavigate = () => {
	const setPage = useSetRecoilState(pageState);
	const safeNavigate = (newPage: PAGE_TYPE) => {
		setPage(newPage);
	};
	
	return { safeNavigate };
};
export default useSafeNavigate;
